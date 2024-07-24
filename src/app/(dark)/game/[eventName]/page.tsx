'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Heading1, Heading3 } from '@entur/typography'
import { Loader } from '@entur/loader'
import Game from '@/components/Game/Game'
import { getEventByEventName, Result } from '@/lib/api/eventApi'
import { Event, StopPlace } from '@/lib/types/types'
import useSWR from 'swr'
import { Contrast } from '@entur/layout'
import { VictoryScreen } from '@/components/Game/VictoryScreen/VictoryScreen'
import Map from '../components/Map'
import { MapPinIcon, DestinationIcon, StandingIcon } from '@entur/icons'
import GameStatus from '@/components/GameStatus'

export default function GamePage(): JSX.Element {
    const [numLegs, setNumLegs] = useState<number>(0)
    const [usedTime, setUsedTime] = useState<number>(0)
    const { eventName }: { eventName: string } = useParams()
    const [isVictory, setVictory] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    const {
        data: eventResult,
        isLoading,
        error: eventError,
    } = useSWR<Result<Event>>(['/events', eventName], () =>
        getEventByEventName(eventName),
    )

    const event = eventResult?.success ? eventResult.data : null
    const maxTime = event?.optimalTravelTime
        ? Math.ceil((3 * event.optimalTravelTime) / (60 * 60)) * 1000 * 60 * 60
        : null

    useEffect(() => {
        if (event) {
            const eventStartDate = new Date(
                Number(event.startTime[0]),
                Number(event.startTime[1]) - 1,
                Number(event.startTime[2]),
                Number(event.startTime[3]),
                Number(event.startTime[4]),
            )
            setStartTime(eventStartDate)
            setCurrentTime(eventStartDate)
        }
    }, [event])

    const [startLocation, setStartLocation] = useState<StopPlace | undefined>()

    useEffect(() => {
        if (event?.startLocation) {
            setStartLocation(event.startLocation)
        }
    }, [event])

    return (
        <>
            {isLoading ? (
                <Contrast>
                    <Loader>Laster inn spill...</Loader>
                </Contrast>
            ) : eventError ||
              !event ||
              !maxTime ||
              !startTime ||
              !currentTime ? (
                <Contrast>
                    <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                        <Heading1>Spill ikke funnet</Heading1>
                    </div>
                </Contrast>
            ) : isVictory ? (
                <Contrast>
                    <div className="app">
                        <VictoryScreen
                            event={event}
                            numLegs={numLegs}
                            currentTime={currentTime}
                            startTime={startTime}
                        />
                    </div>
                </Contrast>
            ) : (
                event &&
                startLocation && (
                    <main className="flex flex-col">
                        <div className="sm:sticky top-20">
                            <GameStatus
                                numLegs={numLegs}
                                usedTime={usedTime}
                                maxTime={maxTime}
                            />
                        </div>
                        <div className="max-w-screen-3xl mx-auto xl:mx-24">
                            <div className="grid grid-cols-5 gap-24">
                                <div className="col-span-3">
                                    <Game
                                        event={event}
                                        maxTime={maxTime}
                                        startTime={startTime}
                                        currentTime={currentTime}
                                        startLocation={startLocation}
                                        setCurrentTime={setCurrentTime}
                                        setUsedTime={setUsedTime}
                                        setNumLegs={setNumLegs}
                                        setVictory={setVictory}
                                        setStartLocation={setStartLocation}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Contrast>
                                        <Map
                                            event={event}
                                            currentPosition={startLocation}
                                        />
                                        <div className="icon-container">
                                            <div className="icon-item">
                                                <MapPinIcon className="text-coral" />
                                                <Heading3 className="map-text">
                                                    Start
                                                </Heading3>
                                            </div>
                                            <div className="icon-item">
                                                <DestinationIcon className="text-coral" />
                                                <Heading3 className="map-text">
                                                    Mål
                                                </Heading3>
                                            </div>
                                            <div className="icon-item">
                                                <StandingIcon className="text-coral" />
                                                <Heading3 className="map-text">
                                                    Din posisjon
                                                </Heading3>
                                            </div>
                                        </div>
                                    </Contrast>
                                </div>
                            </div>
                        </div>
                    </main>
                )
            )}
        </>
    )
}
