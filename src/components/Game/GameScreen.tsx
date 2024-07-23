'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { Paragraph } from '@entur/typography'
import { Departure, QueryMode, StopPlaceDetails } from '@entur/sdk'
import { addHours, addMinutes } from 'date-fns'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import { useRouter } from 'next/navigation'
import { Event, StopPlace } from '@/lib/types/types'
import { useEnturService } from '@/lib/hooks/useEnturService'

import FromAndToTitle from './components/FromAndToTitle'
import TransportTypePicker from './components/TransportTypePicker'
import TravelLegStart from './components/TravelLegStart/TravelLegStart'
import { DepartureAndOnLinePickerModal } from './components/DepartureAndOnLinePickerModal'
import { isTruthy } from '@/lib/utils/isTruthy'
import { TravelLegFinished } from './components/TravelLegFinished'
import DeadScreen from './DeadScreen'
import { Modal } from '@entur/modal'
import { Contrast } from '@entur/layout'

export interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

type Props = {
    event: Event
    maxTime: number
    startTime: Date
    currentTime: Date
    setCurrentTime: React.Dispatch<React.SetStateAction<Date>>
    setUsedTime: React.Dispatch<React.SetStateAction<number>>
    setNumLegs: React.Dispatch<React.SetStateAction<number>>
    setVictory: React.Dispatch<React.SetStateAction<boolean>>
}

function GameScreen({
    event,
    maxTime,
    startTime,
    currentTime,
    setCurrentTime,
    setNumLegs,
    setUsedTime,
    setVictory,
}: Props): ReactElement {
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isDead, setDead] = useState<boolean>(false)
    const [startLocation, setStartLocation] = useState<StopPlace>(
        event.startLocation,
    )
    const [endLocation, setEndLocation] = useState<StopPlace[]>(
        event.endLocation,
    )
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [travelLegs, setTravelLegs] = useState<StopPlace[]>([
        event.startLocation,
    ])
    const [usedMode, setUsedMode] = useState<QueryMode[]>([])
    const [availableModes, setAvailableModes] = useState<QueryMode[]>([])
    const [availableModesError, setAvailableModesError] =
        useState<boolean>(false)
    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

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
        fetchAvailableModes(event.startLocation)
    }, [event])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [currentTime])

    useEffect(() => {
        const newUsedTime = currentTime.getTime() - startTime.getTime()
        setUsedTime(newUsedTime)
        if (currentTime.getTime() - startTime.getTime() > maxTime) {
            setDead(true)
        }
    }, [currentTime, setUsedTime, maxTime, startTime])

    const fetchAvailableModes = async (location: StopPlace) => {
        const modes: QueryMode[] = [
            QueryMode.BUS,
            QueryMode.METRO,
            QueryMode.TRAM,
            QueryMode.RAIL,
            QueryMode.WATER,
        ]

        const departurePromises = modes.map((mode) =>
            getDepartures(location.id, mode, currentTime),
        )
        const walkableStopsPromise = getWalkableStopPlaces(location)
        const results = await Promise.all([
            ...departurePromises,
            walkableStopsPromise,
        ])
        const walkableStops = results.pop() as StopPlace[]

        const validModes = results
            .map((deps, index) =>
                (deps as Departure[]).length > 0 ? modes[index] : null,
            )
            .filter(isTruthy)

        if (walkableStops.length > 0) {
            validModes.unshift(QueryMode.FOOT)
        }
        if (validModes.length < 1) {
            setAvailableModesError(true)
            return
        }
        setAvailableModesError(false)
        setAvailableModes(validModes)
    }

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
                setModalOpen(true)
                setTravelLegsMode((prev) => [...prev, newMode])
                setLoading(false)
            })
        } else {
            getDepartures(startLocation.id, newMode, currentTime).then(
                (deps) => {
                    setStopsOnLine([]) // Reset walkable stops before showing departures
                    setDepartures(deps)
                    setModalOpen(true)
                    setTravelLegsMode((prev) => [...prev, newMode])
                    setLoading(false)
                },
            )
        }
    }

    const selectDeparture = (departure: Departure) => {
        setDepartures([])
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
            fetchAvailableModes(stopAndTime.stopPlace)
        }
    }

    const wait = () => {
        setCurrentTime((prev) => addHours(prev, 6))
        setWaitModalIsOpen(true)
    }

    if (endLocation.some((sp) => sp.id === startLocation.id)) {
        setVictory(true)
    }

    if (isDead) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen endLocationName={endLocation[0].name} />
            </div>
        )
    }

    return (
        <div className="flex flex-col mb-4">
            <Contrast>
                <FromAndToTitle
                    className="mt-10 xl:mt-28"
                    event={event}
                    startTime={startTime}
                />
                <div className="mt-5 xl:mt-14">
                    <TravelLegStart
                        travelLegs={travelLegs}
                        travelLegsMode={travelLegsMode}
                        usedDepartures={usedDepartures}
                    />
                </div>
            </Contrast>
            <div className="mt-5 ml-9 xl:mr-4 xl:ml-12">
                <TransportTypePicker
                    currentTime={currentTime}
                    isLoading={isLoading}
                    mode={mode}
                    usedMode={usedMode}
                    selectMode={selectMode}
                    wait={wait}
                    stopPlace={startLocation}
                    availableModes={availableModes}
                    availableModesError={availableModesError}
                />
            </div>
            <Contrast>
                <div className="mt-5 xl:mt-14">
                    <TravelLegFinished endLocation={endLocation} />
                </div>
                <SecondaryButton
                    className="sm:mt-28 mt-10 mb-10 sm:place-self-start place-self-center"
                    onClick={() => router.push('/')}
                >
                    Avslutt reise
                </SecondaryButton>
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
            </Contrast>
        </div>
    )
}

export default GameScreen
