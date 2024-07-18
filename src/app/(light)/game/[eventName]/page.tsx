'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'
import Game from '@/components/Game/GameScreen'
import GameNavBar from '@/components/NavBar/GameNavBar'
import { getEventByEventName, Result } from '@/lib/api/eventApi'
import { Event } from '@/lib/types/types'
import useSWR from 'swr'
import Map from '../components/Map'

export default function GamePage(): JSX.Element {
    const [startTimer] = useState<number>(Date.now())
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [numLegs, setNumLegs] = useState<number>(0)
    const [totalHp, setTotalHp] = useState<number>(2)

    const { eventName }: { eventName: string } = useParams()

    const {
        data: eventResult,
        isLoading,
        error: eventError,
    } = useSWR<Result<Event>>(['/events', eventName], () =>
        getEventByEventName(eventName),
    )

    const event = eventResult?.success ? eventResult.data : null

    return (
        <>
            {isLoading ? (
                <Loader>Laster spill</Loader>
            ) : eventError || !event ? (
                <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                    <Heading1>Spill ikke funnet</Heading1>
                </div>
            ) : (
                event && (
                    <main className="flex h-screen overflow-hidden">
                        <div className="flex flex-col w-1/2 p-10 bg-blue-900 text-white">
                            <div className="sticky top-20">
                                <GameNavBar
                                    healthLeft={totalHp + 1}
                                    numLegs={numLegs}
                                    timeDescription={timeDescription}
                                />
                            </div>
                            <div className="flex-grow">
                                <Game
                                    name={''}
                                    event={event}
                                    startTimer={startTimer}
                                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                                    handleWinner={() => {}}
                                    totalHp={totalHp}
                                    setTotalHp={setTotalHp}
                                    numLegs={numLegs}
                                    setNumLegs={setNumLegs}
                                    setTimeDescription={setTimeDescription}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 h-1/2 flex items-center justify-center">
                            <div className="map-wrapper">
                                <Map />
                            </div>
                        </div>
                    </main>
                )
            )}
        </>
    )
}
