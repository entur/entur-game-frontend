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
import VictoryScreen from '@/components/Game/VictoryScreen/VictoryScreen'
import Map from '../components/Map'
import { MapPinIcon, DestinationIcon, StandingIcon } from '@entur/icons'
import GameStatus from '@/components/GameStatus'
import DeadScreen from '@/components/Game/DeadScreen'

export default function GamePage(): JSX.Element {
    const [numLegs, setNumLegs] = useState<number>(0)
    const [usedTime, setUsedTime] = useState<number>(0)
    const { eventName }: { eventName: string } = useParams()
    const [isVictory, setVictory] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [isDead, setDead] = useState<boolean>(false)

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

    const [currentLocation, setCurrentLocation] = useState<StopPlace>()

    useEffect(() => {
        if (event?.startLocation) {
            setCurrentLocation(event.startLocation)
        }
    }, [event])

    if (isDead) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen />
            </div>
        )
    }

    return (
        <>
            {isLoading || !startTime || !currentTime ? (
                <Contrast>
                    <Loader>Laster inn spill...</Loader>
                </Contrast>
            ) : eventError || !event || !maxTime ? (
                <Contrast>
                    <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                        <Heading1>Spill ikke funnet</Heading1>
                    </div>
                </Contrast>
            ) : isVictory ? (
                <Contrast>
                    <div>
                        <VictoryScreen
                            event={event}
                            numLegs={numLegs}
                            currentTime={currentTime}
                            startTime={startTime}
                        />
                    </div>
                </Contrast>
            ) : isDead ? (
                <Contrast></Contrast>
            ) : (
                event &&
                currentLocation && (
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
                                        currentLocation={currentLocation}
                                        setCurrentTime={setCurrentTime}
                                        setUsedTime={setUsedTime}
                                        setNumLegs={setNumLegs}
                                        setVictory={setVictory}
                                        setCurrentLocation={setCurrentLocation}
                                        setDead={setDead}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Contrast>
                                        <Map
                                            event={event}
                                            currentPosition={currentLocation}
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
