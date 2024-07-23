'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'
import Game from '@/components/Game/GameScreen'
import GameNavBar from '@/components/NavBar/GameNavBar'
import { getEventByEventName, Result } from '@/lib/api/eventApi'
import { Event } from '@/lib/types/types'
import useSWR from 'swr'
import { Contrast } from '@entur/layout'
import { VictoryScreen } from '@/components/Game/VictoryScreen/VictoryScreen'

export default function GamePage(): JSX.Element {
    const [numLegs, setNumLegs] = useState<number>(0)
    const [usedTime, setUsedTime] = useState<number>(0)
    const { eventName }: { eventName: string } = useParams()
    const [isVictory, setVictory] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [currentTime, setCurrentTime] = useState<Date | null>(null)

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
                <div className="app" style={{ maxWidth: '800px' }}>
                    <VictoryScreen
                        event={event}
                        numLegs={numLegs}
                        currentTime={currentTime}
                        startTime={startTime}
                    />
                </div>
            ) : (
                event && (
                    <main className="flex flex-col">
                        <div className="sm:sticky top-20">
                            <GameNavBar
                                numLegs={numLegs}
                                usedTime={usedTime}
                                maxTime={maxTime}
                            />
                        </div>
                        <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                            <Game
                                event={event}
                                maxTime={maxTime}
                                startTime={startTime}
                                setUsedTime={setUsedTime}
                                numLegs={numLegs}
                                setNumLegs={setNumLegs}
                                setVictory={setVictory}
                            />
                        </div>
                    </main>
                )
            )}
        </>
    )
}
