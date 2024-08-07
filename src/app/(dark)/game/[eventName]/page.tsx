'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'
import Game from '@/components/Game/Game'
import { getEventByEventName, Result } from '@/lib/api/eventApi'
import { Event, StopPlace } from '@/lib/types/types'
import useSWR from 'swr'
import { Contrast } from '@entur/layout'
import VictoryScreen from '@/components/Game/VictoryScreen/VictoryScreen'
import MapComponent from '../components/Map'
import { MapPinIcon, DestinationIcon, StandingIcon } from '@entur/icons'
import GameStatus from '@/components/GameStatus'
import DeadScreen from '@/components/Game/DeadScreen'
import { MapRef } from 'react-map-gl'
import { Button } from '@entur/button'

export default function GamePage(): JSX.Element {
    const [numLegs, setNumLegs] = useState<number>(0)
    const [usedTime, setUsedTime] = useState<number>(0)
    const { eventName }: { eventName: string } = useParams()
    const [isVictory, setVictory] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [isDead, setDead] = useState<boolean>(false)
    const mapRef = useRef<MapRef | null>(null)

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
                Number(event.startTime?.[5]) || 0,
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

    const handleMarkerClick = (longitude: number, latitude: number) => {
        if (mapRef.current) {
            const map = mapRef.current.getMap()
            map.flyTo({
                center: [longitude, latitude],
                zoom: 12,
                speed: 2,
            })
        }
    }

    if (isDead) {
        return (
            <div className="app" style={{ maxWidth: '800px' }}>
                <DeadScreen />
            </div>
        )
    }

    return (
        <>
            {isLoading ? (
                <Contrast>
                    <Loader>Laster inn spill...</Loader>
                </Contrast>
            ) : eventError || !event || !maxTime ? (
                <Contrast>
                    <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                        <Heading1>Aktivt spill ikke funnet</Heading1>
                    </div>
                </Contrast>
            ) : !startTime || !currentTime ? (
                <Contrast>
                    <Loader>Laster inn spill...</Loader>
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
                        <div className="max-w-screen-3xl -mt-20 xl:-mt-16 mx-8 2xl:mx-24">
                            <div className="grid grid-cols-5 gap-24">
                                <div className="col-span-3 -mt-4 xl:mt-0">
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

                                <div className="col-span-2 mt-16">
                                    <Contrast>
                                        <MapComponent
                                            event={event}
                                            currentPosition={currentLocation}
                                            handleMarkerClick={
                                                handleMarkerClick
                                            }
                                            mapRef={mapRef}
                                        />
                                        <div className="icon-container">
                                            {event.startLocation.longitude !==
                                                undefined &&
                                                event.startLocation.latitude !==
                                                    undefined && (
                                                    <div
                                                        className="icon-item cursor-pointer flex items-center"
                                                        onClick={() =>
                                                            handleMarkerClick(
                                                                event
                                                                    .startLocation
                                                                    .longitude!,
                                                                event
                                                                    .startLocation
                                                                    .latitude!,
                                                            )
                                                        }
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="secondary"
                                                            aria-label="Start-ikon"
                                                            onClick={() =>
                                                                handleMarkerClick(
                                                                    event
                                                                        .startLocation
                                                                        .longitude!,
                                                                    event
                                                                        .startLocation
                                                                        .latitude!,
                                                                )
                                                            }
                                                            className="flex items-center justify-center pl-0"
                                                        >
                                                            <MapPinIcon
                                                                height={12}
                                                                className="relative"
                                                                style={{
                                                                    top: '-0.5px',
                                                                }}
                                                            />
                                                            <span className="text-base leading-none">
                                                                Start
                                                            </span>
                                                        </Button>
                                                    </div>
                                                )}
                                            {event.endLocation[0]?.longitude !==
                                                undefined &&
                                                event.endLocation[0]
                                                    ?.latitude !==
                                                    undefined && (
                                                    <div
                                                        className="icon-item cursor-pointer flex items-center"
                                                        onClick={() =>
                                                            handleMarkerClick(
                                                                event
                                                                    .endLocation[0]
                                                                    .longitude!,
                                                                event
                                                                    .endLocation[0]
                                                                    .latitude!,
                                                            )
                                                        }
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="secondary"
                                                            aria-label="Start-ikon"
                                                            onClick={() =>
                                                                handleMarkerClick(
                                                                    event
                                                                        .startLocation
                                                                        .longitude!,
                                                                    event
                                                                        .startLocation
                                                                        .latitude!,
                                                                )
                                                            }
                                                            className="flex items-center justify-center pl-0"
                                                        >
                                                            <DestinationIcon
                                                                height={10}
                                                                className="relative"
                                                                style={{
                                                                    top: '-0.5px',
                                                                }}
                                                            />
                                                            <span className="text-base leading-none">
                                                                Mål
                                                            </span>
                                                        </Button>
                                                    </div>
                                                )}
                                            {currentLocation.longitude !==
                                                undefined &&
                                                currentLocation.latitude !==
                                                    undefined && (
                                                    <div
                                                        className="icon-item cursor-pointer flex items-center"
                                                        onClick={() =>
                                                            handleMarkerClick(
                                                                currentLocation.longitude!,
                                                                currentLocation.latitude!,
                                                            )
                                                        }
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="secondary"
                                                            aria-label="Start-ikon"
                                                            onClick={() =>
                                                                handleMarkerClick(
                                                                    event
                                                                        .startLocation
                                                                        .longitude!,
                                                                    event
                                                                        .startLocation
                                                                        .latitude!,
                                                                )
                                                            }
                                                            className="flex items-center justify-center pl-0"
                                                        >
                                                            <StandingIcon
                                                                height={12}
                                                                className="relative"
                                                                style={{
                                                                    top: '-0.5px',
                                                                }}
                                                            />
                                                            <span className="text-base leading-none">
                                                                Deg
                                                            </span>
                                                        </Button>
                                                    </div>
                                                )}
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
