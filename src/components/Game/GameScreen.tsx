'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { Heading4, Paragraph } from '@entur/typography'
import { Departure, QueryMode, StopPlace, StopPlaceDetails } from '@entur/sdk'
import { addHours, addMinutes } from 'date-fns'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import { useRouter } from 'next/navigation'

import { Event } from '@/lib/types/types'
import { InvalidTravelModal } from './components/InvalidTravelModal'
import { useEnturService } from '@/lib/hooks/useEnturService'
import { formatDate, formatTimeForEndOfGame } from '@/lib/utils/dateFnsUtils'
import FromAndToTitle from './components/FromAndToTitle'
import TransportTypePicker from './components/TransportTypePicker'
import TravelLegStart from './components/TravelLegStart/TravelLegStart'
import { DepartureAndOnLinePickerModal } from './components/DepartureAndOnLinePickerModal'
import { isTruthy } from '@/lib/utils/isTruthy'
import { TravelLegFinished } from './components/TravelLegFinished'
import DeadScreen from './DeadScreen'
import { VictoryScreen } from './VictoryScreen/VictoryScreen'
import { Modal } from '@entur/modal'

export interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

type Props = {
    name: string
    event: Event
    startTimer: number
    handleWinner: () => void
    totalHp: number
    setTotalHp: React.Dispatch<React.SetStateAction<number>>
    numLegs: number
    setNumLegs: React.Dispatch<React.SetStateAction<number>>
    setTimeDescription: React.Dispatch<React.SetStateAction<string>>
}

function GameScreen({
    event,
    totalHp,
    setTotalHp,
    numLegs,
    setNumLegs,
    setTimeDescription,
    startTimer,
    handleWinner,
    name,
}: Props): ReactElement {
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
    const [startLocation, setStartLocation] = useState<StopPlace>(
        event.startLocation,
    )
    const [endLocation, setEndLocation] = useState<StopPlace[]>(
        event.endLocation,
    )
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [noTransport, setNoTransport] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [travelLegs, setTravelLegs] = useState<StopPlace[]>([
        event.startLocation,
    ])
    const [usedMode, setUsedMode] = useState<QueryMode[]>([])
    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()
    const [startTime, setStartTime] = useState<Date>(new Date())
    const [currentTime, setCurrentTime] = useState<Date>(startTime)
    // TravelLegStart states
    const [travelLegsMode, setTravelLegsMode] = useState<QueryMode[]>([])
    const [usedDepartures, setUsedDepartures] = useState<
        (Departure | undefined)[]
    >([undefined])
    const [waitModalIsOpen, setWaitModalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setStartLocation(event.startLocation)
        setTravelLegs([event.startLocation])
        setEndLocation(event.endLocation)
        setStartTime(new Date())
    }, [event])

    useEffect(() => {
        setTimeDescription(formatTimeForEndOfGame(currentTime, startTime))
        window.scrollTo(0, document.body.scrollHeight)
    }, [currentTime])

    const selectMode = (newMode: QueryMode) => {
        setMode(newMode)
        setLoading(true)
        if (newMode === 'foot') {
            setDepartures([]) // Reset departures before showing walkable stops
            getWalkableStopPlaces(startLocation).then((stops) => {
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
                    setTravelLegsMode((prev) => [...prev, newMode])
                }
                setLoading(false)
            })
        } else {
            getDepartures(startLocation.id, newMode, currentTime).then(
                (deps) => {
                    setStopsOnLine([]) // Reset walkable stops before showing departures
                    setDepartures(deps)
                    if (!deps.length) {
                        if (totalHp >= 0) {
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
                        setTravelLegsMode((prev) => [...prev, newMode])
                    }
                    setLoading(false)
                },
            )
        }
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
        setUsedMode([])
        setStopsOnLine([])
        setCurrentTime(stopAndTime.time)
        setMode(null)
        setModalOpen(false)
        if (stopAndTime) {
            setStartLocation(stopAndTime.stopPlace)
            setTravelLegs((prev) => [...prev, stopAndTime.stopPlace])
            setNumLegs((prev) => prev + 1)
        }
    }

    const wait = () => {
        setCurrentTime((prev) => addHours(prev, 6))
        setWaitModalIsOpen(true)
    }

    if (endLocation.some((sp) => sp.id === startLocation.id)) {
        handleWinner()
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <VictoryScreen
                    name={name}
                    event={event}
                    endLocation={endLocation[0]}
                    setEndLocation={(endLocation) => {
                        setEndLocation([endLocation])
                    }}
                    numLegs={numLegs}
                    currentTime={currentTime}
                    startTime={startTime}
                    startTimer={startTimer}
                />
            </div>
        )
    }

    if (dead && mode) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen mode={mode} stopPlace={startLocation} />
            </div>
        )
    }
    return (
        <div className="flex flex-col mb-4">
            <FromAndToTitle className="mt-10 xl:mt-28" event={event} />
            <Heading4 margin="none">{formatDate(startTime)}</Heading4>
            <Heading4 margin="none">Hvordan vil du starte?</Heading4>
            <div className="mt-5 xl:mt-14">
                <TravelLegStart
                    travelLegs={travelLegs}
                    travelLegsMode={travelLegsMode}
                    usedDepartures={usedDepartures}
                />
            </div>
            <div className="mt-5 ml-9 xl:mr-4 xl:ml-12">
                <TransportTypePicker
                    currentTime={currentTime}
                    isLoading={isLoading}
                    mode={mode}
                    usedMode={usedMode}
                    selectMode={selectMode}
                    wait={wait}
                    stopPlace={startLocation}
                    firstMove={travelLegs.length === 1}
                />
            </div>
            <div className="mt-5 xl:mt-14">
                <TravelLegFinished endLocation={endLocation} />
            </div>
            <SecondaryButton
                className="bg-lavender hover:bg-blue-80 sm:mt-28 mt-10 mb-10 sm:place-self-start place-self-center"
                onClick={() => router.push('/')}
            >
                Avslutt reise
            </SecondaryButton>
            <InvalidTravelModal
                usedMode={usedMode}
                noTransport={noTransport}
                setNoTransport={setNoTransport}
                stopPlace={startLocation.name}
            />
            <Modal
                open={waitModalIsOpen}
                onDismiss={() => setWaitModalIsOpen(false)}
                title="Du har ventet i seks timer"
                size="medium"
            >
                <Paragraph>
                    Du har ventet i seks timer, og kan nå fortsette reisen.
                </Paragraph>
                <PrimaryButton onClick={() => setWaitModalIsOpen(false)}>
                    OK
                </PrimaryButton>
            </Modal>
            <DepartureAndOnLinePickerModal
                isOpenModal={isModalOpen}
                departures={departures}
                stopsOnLine={stopsOnLine}
                selectDeparture={selectDeparture}
                mode={mode}
                selectStopOnLine={selectStopOnLine}
                setModalOpen={setModalOpen}
                setUsedDepartures={setUsedDepartures}
            />
        </div>
    )
}

export default GameScreen
