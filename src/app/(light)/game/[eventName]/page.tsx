'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'

import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '@/components/Game/GameScreen'
import GameNavBar from '@/components/NavBar/GameNavBar'
import { getEventByEventName } from '@/lib/api/eventApi'
import { Event } from '@/lib/types/types'
import useSWR from 'swr'

export default function GamePage(): JSX.Element {
    const [startTimer] = useState<number>(Date.now())
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [numLegs, setNumLegs] = useState<number>(0)
    const [totalHp, setTotalHp] = useState<number>(2)

    const { eventName }: { eventName: string } = useParams()

    const {
        data: event,
        isLoading,
        error: eventError,
    } = useSWR<Event | null>(['/events', eventName], () =>
        getEventByEventName(eventName),
    )

    return (
        <>
            {isLoading ? (
                <Loader>Laster spill</Loader>
            ) : eventError ? (
                <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                    <Heading1>Spill ikke funnet</Heading1>
                </div>
            ) : (
                event && (
                    <main className="flex flex-col">
                        <div className="sm:sticky top-20">
                            <GameNavBar
                                healthLeft={totalHp + 1}
                                numLegs={numLegs}
                                timeDescription={timeDescription}
                            />
                        </div>
                        <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                            <Game
                                name={''}
                                event={event}
                                startTimer={startTimer}
                                // eslint-disable-next-line @typescript-eslint/no-empty-function
                                handleWinner={() => { }}
                                totalHp={totalHp}
                                setTotalHp={setTotalHp}
                                numLegs={numLegs}
                                setNumLegs={setNumLegs}
                                setTimeDescription={setTimeDescription}
                            />
                        </div>
                    </main>
                )
            )}
        </>
    )
}
