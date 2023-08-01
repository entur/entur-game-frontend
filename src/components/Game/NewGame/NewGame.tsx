import React, { ReactElement, useEffect, useState } from 'react'

import { Level } from '../../../constant/levels'
import { Heading4 } from '@entur/typography'
import { InvalidTravelModal } from './InvalidTravelModal'
import { useNavigate } from 'react-router-dom'
import { Departure, QueryMode, StopPlace, StopPlaceDetails } from '@entur/sdk'
import { useEnturService } from '../../../hooks/useEnturService'
import { addHours, addMinutes } from 'date-fns'
import { formatTimeForEndOfGame } from '../../../utils/dateFnsUtils'
import FromAndToTitle from './FromAndToTitle'
import TransportTypePicker from './TransportTypePicker'
import TravelLegStart from './TravelLegStart'
import { DepartureAndOnLinePickerModal } from './DepartureAndOnLinePickerModal'
import { isTruthy } from '../../../utils/isTruthy'
import { TravelLegFinished } from './TravelLegFinished'

interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

const startTime = new Date()

type Props = {
    nickname: string
    level: Level
    startTimer: number
    handleWinner: () => void
    totalHp: number
    setTotalHp: React.Dispatch<React.SetStateAction<number>>
    numLegs: number
    setNumLegs: React.Dispatch<React.SetStateAction<number>>
    setTimeDescription: React.Dispatch<React.SetStateAction<string>>
}

function NewGame({
    level,
    totalHp,
    setTotalHp,
    numLegs,
    setNumLegs,
    setTimeDescription,
}: Props): ReactElement {
    const navigate = useNavigate()
    const [hasBeenSprinkled, setSprinkled] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
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
    console.log(travelLegsMode)
    console.log(travelLegs)
    useEffect(() => {
        setStopPlace(level.start)
        setTravelLegs([level.start])
        setTargets(level.targets)
    }, [level])

    useEffect(() => {
        setTimeDescription(
            formatTimeForEndOfGame(
                currentTime,
                startTime,
                level.difficulty,
                numLegs,
            ),
        )
    }, [currentTime])

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

    const wait = () => {
        setCurrentTime((prev) => addHours(prev, 6))
    }

    return (
        <>
            <FromAndToTitle className="mt-10 xl:mt-28" level={level} />
            <Heading4 margin="none">Hvordan vil du starte?</Heading4>
            <div className="mt-5 xl:mt-14">
                <TravelLegStart
                    travelLegs={travelLegs}
                    travelLegsMode={travelLegsMode}
                />
            </div>
            <div className="mt-5 ml-9 xl:mr-4 xl:ml-12">
                <TransportTypePicker
                    mode={mode}
                    usedMode={usedMode}
                    selectMode={selectMode}
                    wait={wait}
                    stopPlace={stopPlace}
                />
            </div>
            <div className="mt-5 xl:mt-14">
                <TravelLegFinished targets={targets} />
            </div>
            <InvalidTravelModal
                usedMode={usedMode}
                noTransport={noTransport}
                setNoTransport={setNoTransport}
                stopPlace={stopPlace.name}
            />
            <DepartureAndOnLinePickerModal
                isOpenModal={isModalOpen}
                departures={departures}
                stopsOnLine={stopsOnLine}
                selectDeparture={selectDeparture}
                mode={mode}
                selectStopOnLine={selectStopOnLine}
                setModalOpen={setModalOpen}
            />
        </>
    )
}

export default NewGame
