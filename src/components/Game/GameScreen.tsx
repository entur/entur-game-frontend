'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { Heading4, Paragraph } from '@entur/typography'
import { Departure, QueryMode, StopPlaceDetails } from '@entur/sdk'
import { addHours, addMinutes } from 'date-fns'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import { useRouter } from 'next/navigation'
import { Event, StopPlace } from '@/lib/types/types'
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
    maxTime: number
    setUsedTime: React.Dispatch<React.SetStateAction<number>>
    numLegs: number
    setNumLegs: React.Dispatch<React.SetStateAction<number>>
}

function GameScreen({
    event,
    numLegs,
    setNumLegs,
    startTimer,
    handleWinner,
    maxTime,
    setUsedTime,
    name,
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
    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

    const eventStartDate = new Date(
        Number(event.startTime[0]),
        Number(event.startTime[1]) - 1,
        Number(event.startTime[2]),
        Number(event.startTime[3]),
        Number(event.startTime[4]),
    )

    const [startTime, setStartTime] = useState<Date>(eventStartDate)
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
        setStartTime(eventStartDate)
        fetchAvailableModes(event.startLocation)
    }, [event])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [currentTime])

    //TODO: feilteste!!!!!
    //TODO: litt teit at man ikke vet om en rute gjør at man dør! Det må man finne ut av hva vi gjør med!

    useEffect(() => {
        const newUsedTime = currentTime.getTime() - startTime.getTime()
        setUsedTime(newUsedTime)
        if ((currentTime.getTime() - startTime.getTime()) > maxTime) {
            setDead(true)
        }
    }, [currentTime, setUsedTime, maxTime, startTime])

    const fetchAvailableModes = async (location: StopPlace) => {
        const modes: QueryMode[] = [
            QueryMode.BUS,
            QueryMode.METRO,
            QueryMode.TRAM,
            QueryMode.RAIL,
            QueryMode.WATER
        ]

        const departurePromises = modes.map(mode => getDepartures(location.id, mode, currentTime))
        const walkableStopsPromise = getWalkableStopPlaces(location)
        const results = await Promise.all([...departurePromises, walkableStopsPromise])
        const walkableStops = results.pop() as StopPlace[]

        const validModes = results
            .map((deps, index) => (deps as Departure[]).length > 0 ? modes[index] : null)
            .filter(isTruthy)

        if (walkableStops.length > 0) {
            validModes.unshift(QueryMode.FOOT)
        }

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
            getDepartures(startLocation.id, newMode, currentTime).then((deps) => {
                setStopsOnLine([]) // Reset walkable stops before showing departures
                setDepartures(deps)
                setModalOpen(true)
                setTravelLegsMode((prev) => [...prev, newMode])
                setLoading(false)
            })
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
        handleWinner()
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <VictoryScreen
                    name={name}
                    event={event}
                    endLocation={endLocation}
                    numLegs={numLegs}
                    currentTime={currentTime}
                    startTime={startTime}
                    startTimer={startTimer}
                />
            </div>
        )
    }

    if (isDead) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen />
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
                    availableModes={availableModes}
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
