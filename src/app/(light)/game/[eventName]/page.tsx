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

export default function GamePage(): JSX.Element {
    const [startTimer] = useState<number>(Date.now())
    //TODO: bytte ut med usedTime etterhvert!!!
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [numLegs, setNumLegs] = useState<number>(0)
    const [usedTime, setUsedTime] = useState<number>(0)
    const { eventName }: { eventName: string } = useParams()

    const {
        data: eventResult,
        isLoading,
        error: eventError,
    } = useSWR<Result<Event>>(['/events', eventName], () =>
        getEventByEventName(eventName),
    )


    const event = eventResult?.success ? eventResult.data : null
    const maxTime = event?.optimalTravelTime ? 3 * event.optimalTravelTime * 1000 : null

    return (
        <>
            {isLoading ? (
                <Loader>Laster spill</Loader>
            ) : (eventError || !event || !maxTime) ? (
                <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                    <Heading1>Spill ikke funnet</Heading1>
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
                                name={''}
                                event={event}
                                startTimer={startTimer}
                                // eslint-disable-next-line @typescript-eslint/no-empty-function
                                handleWinner={() => { }}
                                maxTime={maxTime}
                                usedTime={usedTime}
                                setUsedTime={setUsedTime}
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
