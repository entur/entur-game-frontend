import React, { useEffect, useState } from 'react'
import { addMinutes, addHours } from 'date-fns'
import { sprinkleEmojis } from 'emoji-sprinkle'

import { Departure, StopPlace, QueryMode, StopPlaceDetails } from '@entur/sdk'
import { TravelHeader } from '@entur/travel'
import { SleepIcon } from '@entur/icons'
import { Heading2, Paragraph } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { PrimaryButton } from '@entur/button'
import { useNavigate } from 'react-router-dom'

import '../../App.css'
import { getModeIcon, getModeTranslation } from '../../utils/transportMapper'
import {
    formatDateAndTime,
    formatTime,
    formatTimeForEndOfGame,
} from '../../utils/dateFnsUtils'
import { ALL_MODES } from '../../constant/queryMode'
import { Level } from '../../constant/levels'
import { isTruthy } from '../../utils/isTruthy'
import { useEnturService } from '../../hooks/useEnturService'
import VictoryScreen from './VictoryScreen'
import DeadScreen from './DeadScreen'

interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

const startTime = new Date()

type Props = {
    level: Level
    startTimer: number
    handleWinner: () => Promise<void>
}

function Game({ level, startTimer, handleWinner }: Props): JSX.Element {
    const navigate = useNavigate()
    const [hasBeenSprinkled, setSprinkled] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [stopPlace, setStopPlace] = useState<StopPlace>(level.start)
    const [targets, setTargets] = useState<StopPlace[]>(level.targets)
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

    useEffect(() => {
        setStopPlace(level.start)
        setTargets(level.targets)
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

    if (targets.some((sp) => sp.id === stopPlace.id)) {
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
            <VictoryScreen
                level={level}
                target={targets[0]}
                setTarget={(target) => {
                    setTargets([target])
                }}
                numLegs={numLegs}
                currentTime={currentTime}
                startTime={startTime}
                startTimer={startTimer}
            />
        )
    }

    if (dead && mode) {
        return <DeadScreen mode={mode} stopPlace={stopPlace} />
    }

    return (
        <div className="app">
            <header>
                <TravelHeader
                    from={
                        level.targets[level.targets.indexOf(targets[0]) - 1]
                            ?.name || level.start.name
                    }
                    to={targets[0].name}
                    style={{ marginBottom: '2rem' }}
                />
                <Paragraph>
                    Du er på {stopPlace.name} og det er{' '}
                    {formatDateAndTime(currentTime)}. Kom deg til{' '}
                    {targets[0].name} så fort som mulig!
                </Paragraph>
                <Paragraph>
                    Du har reist {numLegs} etapper og brukt{' '}
                    {formatTimeForEndOfGame(currentTime, startTime)}.
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
                    <PrimaryButton
                        onClick={() => navigate(-1)}
                        style={{ marginTop: '10px' }}
                    >
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
                        <PrimaryButton
                            onClick={() => navigate(-1)}
                            style={{ marginTop: '10px' }}
                        >
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
                        <PrimaryButton
                            onClick={() => navigate(-1)}
                            style={{ marginTop: '10px' }}
                        >
                            Send meg tilbake
                        </PrimaryButton>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Game
