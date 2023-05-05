import React, { useEffect, useState } from 'react'
import { addMinutes, addHours } from 'date-fns'
import { sprinkleEmojis } from 'emoji-sprinkle'

import { Departure, StopPlace, QueryMode, StopPlaceDetails } from '@entur/sdk'
import { TravelHeader } from '@entur/travel'
import { SleepIcon } from '@entur/icons'
import { TextField } from '@entur/form'
import { Heading1, Heading2, Paragraph } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { PrimaryButton } from '@entur/button'

import '../App.css'
import { getModeIcon, getModeTranslation } from '../utils/transportMapper'
import {
    formatDateAndTime,
    formatInterval,
    formatIntervalToSeconds,
    formatTime,
} from '../utils/dateFnsUtils'
import { ALL_MODES } from '../constant'
import { Level } from '../Level'
import { isTruthy } from '../utils/isTruthy'
import { useEnturService } from '../hooks/useEnturService'

interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

const startTime = new Date()

interface PlayerResponse {
    nickname: string
    difficulty: string
    totalOptions: number
    totalPlaytime: number
    totalTravelTime: number
    fromDestination: Destination
    toDestination: Destination
}

interface Destination {
    id: string
    destination: string
}

type Props = {
    level: Level
    startTimer: number
    handleWinner: () => void
}

function Game({ level, startTimer, handleWinner }: Props): JSX.Element {
    const [name, setName] = useState('')
    const [hasBeenSprinkled, setSprinkled] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [stopPlace, setStopPlace] = useState<StopPlace>(level.start)
    const [target, setTarget] = useState<StopPlace>(level.targets[0])
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

    async function handleSavePlayerScore(playerInfo: PlayerResponse) {
        await fetch('http://localhost:8080/player-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerInfo),
        })
    }

    useEffect(() => {
        setStopPlace(level.start)
        setTarget(level.targets[0])
    }, [level])

    const selectMode = (newMode: QueryMode) => {
        setMode(newMode)
        if (newMode === 'foot') {
            getWalkableStopPlaces(stopPlace).then((stops) => {
                setStopsOnLine(
                    stops.map((stop) => ({
                        stopPlace: stop,
                        time: addMinutes(currentTime, 2),
                    })),
                )
                if (!stops.length) {
                    setDead(true)
                }
            })
        } else {
            getDepartures(stopPlace.id, newMode, currentTime).then((deps) => {
                setDepartures(deps)
                if (!deps.length) {
                    setDead(true)
                }
            })
        }
    }

    const wait = () => {
        setCurrentTime((prev) => addHours(prev, 6))
    }

    const selectDeparture = (departure: Departure) => {
        setDepartures([])
        setCurrentTime(new Date(departure.expectedDepartureTime))
        getStopsOnLine(departure.serviceJourney.id, departure.date).then(
            (departures) => {
                setStopsOnLine(
                    departures
                        .map((d, index) => {
                            const stop = d.quay?.stopPlace
                            if (
                                !stop ||
                                d.expectedDepartureTime <=
                                    departure.expectedDepartureTime
                            )
                                return undefined
                            const nextDep = departures[index + 1]
                            return {
                                stopPlace: stop,
                                time: new Date(
                                    (nextDep || d).expectedArrivalTime,
                                ),
                            }
                        })
                        .filter(isTruthy),
                )
            },
        )
    }

    const selectStopOnLine = (stopAndTime: StopAndTime) => {
        setStopsOnLine([])
        setCurrentTime(stopAndTime.time)
        setMode(null)
        if (stopAndTime) {
            setStopPlace(stopAndTime.stopPlace)
            setNumLegs((prev) => prev + 1)
        }
    }

    if (stopPlace.id === target.id) {
        handleWinner()
        if (!hasBeenSprinkled) {
            sprinkleEmojis({
                emoji: '🎉',
                count: 50,
                fade: 10,
                fontSize: 30,
            })
            setSprinkled(true)
        }
        return (
            <div className="app">
                <Heading1>
                    Du klarte det!{' '}
                    <span role="img" aria-label="Konfetti">
                        🎉
                    </span>
                </Heading1>
                <Paragraph>{`Du kom deg fra ${level.start.name} til ${
                    target.name
                } på ${numLegs} ${
                    numLegs === 1 ? 'etappe' : 'etapper'
                } og ${formatInterval(currentTime, startTime)}.`}</Paragraph>
                {target === level.targets[level.targets.length - 1] ? (
                    <>
                        <TextField
                            label="nickname"
                            onChange={(e) => setName(e.target.value)}
                        ></TextField>
                        <PrimaryButton
                            onClick={() =>
                                handleSavePlayerScore({
                                    nickname: name,
                                    difficulty: level.difficulty,
                                    fromDestination: {
                                        destination: level.start.name,
                                        id: level.start.id,
                                    },
                                    toDestination: {
                                        destination: target.name,
                                        id: target.id,
                                    },
                                    totalOptions: numLegs,
                                    totalPlaytime: Math.trunc(
                                        (Date.now() - startTimer) / 1000,
                                    ),
                                    totalTravelTime: formatIntervalToSeconds(
                                        currentTime,
                                        startTime,
                                    ),
                                })
                            }
                        >
                            Lagre min poengsum!
                        </PrimaryButton>
                        <PrimaryButton onClick={() => window.location.reload()}>
                            Spill på nytt
                        </PrimaryButton>
                    </>
                ) : (
                    <PrimaryButton
                        onClick={() =>
                            setTarget(
                                level.targets[
                                    level.targets.indexOf(target) + 1
                                ],
                            )
                        }
                    >
                        Dra videre
                    </PrimaryButton>
                )}
            </div>
        )
    }

    return (
        <div className="app">
            <header>
                <TravelHeader
                    from={
                        level.targets[level.targets.indexOf(target) - 1]
                            ?.name || level.start.name
                    }
                    to={target.name}
                    style={{ marginBottom: '2rem' }}
                />
                <Paragraph>
                    Du er på {stopPlace.name} og det er{' '}
                    {formatDateAndTime(currentTime)}. Kom deg til {target.name}{' '}
                    så fort som mulig!
                </Paragraph>
                <Paragraph>
                    Du har reist {numLegs} etapper og brukt{' '}
                    {formatInterval(currentTime, startTime)}.
                </Paragraph>
            </header>
            {!mode ? (
                <div>
                    <Heading2>Velg transportmåte fra {stopPlace.name}</Heading2>
                    <ChoiceChipGroup
                        value={mode || 'none'}
                        onChange={console.log}
                        name="Transport mode"
                    >
                        <>
                            {ALL_MODES.map((mode) => (
                                <ChoiceChip
                                    key={mode}
                                    value={mode}
                                    onClick={() => selectMode(mode)}
                                >
                                    {getModeIcon(mode)}
                                    {getModeTranslation(mode)}
                                </ChoiceChip>
                            ))}
                            <ChoiceChip
                                key="wait"
                                value="wait"
                                onClick={() => wait()}
                            >
                                <SleepIcon />
                                Vent 6 timer
                            </ChoiceChip>
                        </>
                    </ChoiceChipGroup>
                    <PrimaryButton onClick={() => window.location.reload()}>
                        Send meg tilbake
                    </PrimaryButton>
                </div>
            ) : null}
            <div>
                {departures.length ? (
                    <div>
                        <Heading2>Velg avgang</Heading2>
                        <ChoiceChipGroup
                            value="none"
                            onChange={console.log}
                            name="Departure"
                        >
                            {departures.map((departure) => (
                                <ChoiceChip
                                    key={
                                        departure.destinationDisplay.frontText +
                                        departure.serviceJourney.id
                                    }
                                    value={
                                        departure.destinationDisplay.frontText +
                                        departure.serviceJourney.id
                                    }
                                    onClick={() => selectDeparture(departure)}
                                >
                                    {mode ? getModeIcon(mode) : null}
                                    {
                                        departure.serviceJourney.journeyPattern
                                            ?.line.publicCode
                                    }{' '}
                                    {departure.destinationDisplay.frontText} kl.{' '}
                                    {formatTime(
                                        departure.expectedDepartureTime,
                                    )}
                                </ChoiceChip>
                            ))}
                        </ChoiceChipGroup>
                        <PrimaryButton onClick={() => window.location.reload()}>
                            Send meg tilbake
                        </PrimaryButton>
                    </div>
                ) : null}
            </div>
            <div>
                {stopsOnLine.length ? (
                    <div>
                        <Heading2>
                            Hvor vil du gå {mode === 'foot' ? 'til' : 'av'}?
                        </Heading2>

                        <ChoiceChipGroup
                            value="none"
                            onChange={console.log}
                            name="Stop on line"
                        >
                            {stopsOnLine.map((stop) => (
                                <ChoiceChip
                                    key={stop.stopPlace.id}
                                    value={stop.stopPlace.id}
                                    onClick={() => selectStopOnLine(stop)}
                                >
                                    {stop.stopPlace.name}
                                </ChoiceChip>
                            ))}
                        </ChoiceChipGroup>
                        <PrimaryButton onClick={() => window.location.reload()}>
                            Send meg tilbake
                        </PrimaryButton>
                    </div>
                ) : null}
            </div>

            {dead && mode ? (
                <div>
                    {sprinkleEmojis({
                        emoji: '👻',
                        count: 50,
                        fade: 10,
                        fontSize: 60,
                    })}
                    <Heading2>Du døde!</Heading2>
                    <Paragraph>
                        {`Det går ingen avganger med ${getModeTranslation(
                            mode,
                        ).toLowerCase()} fra ${stopPlace.name} i nær fremtid.`}
                    </Paragraph>
                    <PrimaryButton onClick={() => window.location.reload()}>
                        Prøv igjen
                    </PrimaryButton>
                </div>
            ) : null}
        </div>
    )
}

export default Game
