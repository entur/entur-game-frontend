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
    formatTimeForEndOfGame,
} from '../../utils/dateFnsUtils'
import { ALL_MODES } from '../../constant/queryMode'
import { Level } from '../../constant/levels'
import { isTruthy } from '../../utils/isTruthy'
import { useEnturService } from '../../hooks/useEnturService'
import VictoryScreen from './VictoryScreen'
import DeadScreen from './DeadScreen'
import { HpBar } from './HpBar'
import { ModalTransport } from './ModalTransport'
import { InvalidTravelModal } from './NewGame/InvalidTravelModal'

export interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

const startTime = new Date()

type Props = {
    nickname: string
    level: Level
    startTimer: number
    handleWinner: () => void
}

function Game({
    nickname,
    level,
    startTimer,
    handleWinner,
}: Props): JSX.Element {
    const navigate = useNavigate()
    const [totalHp, setTotalHp] = useState<number>(2)
    const [hasBeenSprinkled, setSprinkled] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [travelLegsMode, setTravelLegsMode] = useState<QueryMode[]>([])
    const [stopPlace, setStopPlace] = useState<StopPlace>(level.start)
    const [travelLegs, setTravelLegs] = useState<StopPlace[]>([level.start])
    const [targets, setTargets] = useState<StopPlace[]>(level.targets)
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [noTransport, setNoTransport] = useState<boolean>(false)
    const [usedMode, setUsedMode] = useState<QueryMode[]>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

    useEffect(() => {
        setStopPlace(level.start)
        setTravelLegs([level.start])
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
                    if (totalHp > 0) {
                        setTotalHp((prev) => prev - 1)
                        setNoTransport(true)
                    }

                    if (totalHp < 1) {
                        setDead(true)
                        return
                    }

                    setUsedMode((prev) => [...prev, newMode])
                    setMode(null)
                } else {
                    setModalOpen(true)
                    setUsedMode([])
                    setTravelLegsMode((prev) => [...prev, newMode])
                }
            })
        } else {
            getDepartures(stopPlace.id, newMode, currentTime).then((deps) => {
                setDepartures(deps)
                if (!deps.length) {
                    if (totalHp > 0) {
                        setTotalHp((prev) => prev - 1)
                        setNoTransport(true)
                    }
                    if (totalHp < 1) {
                        setDead(true)
                        return
                    }
                    setUsedMode((prev) => [...prev, newMode])
                    setMode(null)
                } else {
                    setModalOpen(true)
                    setUsedMode([])
                    setTravelLegsMode((prev) => [...prev, newMode])
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
        setModalOpen(false)
        if (stopAndTime) {
            setStopPlace(stopAndTime.stopPlace)
            setTravelLegs((prev) => [...prev, stopAndTime.stopPlace])
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
            <div className="app" style={{ maxWidth: '800px' }}>
                <VictoryScreen
                    nickname={nickname}
                    level={level}
                    target={targets[0]}
                    setTarget={(target) => {
                        setTargets([target])
                    }}
                    numLegs={numLegs}
                    currentTime={currentTime}
                    startTime={startTime}
                    startTimer={startTimer}
                    travelLegs={travelLegs}
                    travelLegsMode={travelLegsMode}
                />
            </div>
        )
    }

    if (dead && mode) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen mode={mode} stopPlace={stopPlace} />
            </div>
        )
    }

    return (
        <div className="app" style={{ maxWidth: '800px' }}>
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
                    {formatTimeForEndOfGame(
                        currentTime,
                        startTime,
                        level.difficulty,
                        numLegs,
                    )}
                    .
                </Paragraph>
                <HpBar totalHp={totalHp + 1} />
            </header>
            {!mode ? (
                <div className="border-2 rounded-md shadow pl-10 pb-8">
                    <Heading2>
                        Velg transportmåte fra{' '}
                        <span className="text-coral">{stopPlace.name}</span>
                    </Heading2>
                    <ChoiceChipGroup
                        value={mode || 'none'}
                        onChange={console.log}
                        name="Transport mode"
                    >
                        <>
                            {ALL_MODES.map((mode) => {
                                const disabled = usedMode.includes(mode)
                                return (
                                    <>
                                        <ChoiceChip
                                            className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                                            key={mode}
                                            value={mode}
                                            onClick={() => selectMode(mode)}
                                            disabled={disabled}
                                        >
                                            {getModeIcon(mode)}
                                            {getModeTranslation(mode)}
                                        </ChoiceChip>
                                    </>
                                )
                            })}
                            <ChoiceChip
                                className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                                key="wait"
                                value="wait"
                                onClick={() => wait()}
                            >
                                <SleepIcon />
                                Vent 6 timer
                            </ChoiceChip>
                            <InvalidTravelModal
                                usedMode={usedMode}
                                noTransport={noTransport}
                                setNoTransport={setNoTransport}
                                stopPlace={stopPlace.name}
                            />
                        </>
                    </ChoiceChipGroup>
                </div>
            ) : null}
            <ModalTransport
                isOpenModal={isModalOpen}
                departures={departures}
                stopsOnLine={stopsOnLine}
                selectDeparture={selectDeparture}
                mode={mode}
                selectStopOnLine={selectStopOnLine}
                setModalOpen={setModalOpen}
            />
            <PrimaryButton
                onClick={() => navigate(-1)}
                style={{ marginTop: '10px' }}
            >
                Hovedmeny
            </PrimaryButton>
        </div>
    )
}

export default Game
