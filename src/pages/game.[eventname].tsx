import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '../components/Game/GameScreen'
import GameNavBar from '../components/NavBar/GameNavBar'
import { useBackground } from '../contexts/backgroundContext' //TODO-later: hvorfor er det funksjon for backgrunnen???

import { getGameModeByDifficulty, getEventByEventName } from '../api/gameModeApi' //TODO: må også endres, gameMode -> event
import { Event } from '@/types/types'
import mockEvent from '../mock-api/event'

export function GamePage(): JSX.Element {
    //visuals and game logic
    const [numLegs, setNumLegs] = useState<number>(0)
    const [startTimer, setStartTimer] = useState<number>(0)
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [totalHp, setTotalHp] = useState<number>(2)
    const { setBackgroundColor } = useBackground() //TODO-later: backgroundColor

    //event logic
    const { eventName } = useParams()
    const [event, setEvent] = useState<Event | null>(mockEvent) //TODO: mockEvent
    const [isEventError, setEventError] = useState<boolean>(false) //TODO: mockEvent
    const [eventJson, setEventJson] = useState<Event | null>(null)
    const [loadingEventJson, setLoadingEventJson] = useState<boolean>(true)

    useEffect(() => {
        setBackgroundColor('bg-blue-90')
        setStartTimer(Date.now())
        return () => setBackgroundColor('bg-main-blue')
    }, [setBackgroundColor])

    useEffect(() => {
        async function getData() {
            console.log(event)
            if (event === null) {
                setEventError(true)
                return
            } else {
                setEventError(false)
                setEvent(event)
            }
        }
        getData()
    }, [eventName])

    useEffect(() => {
        async function fetchEventJson() {
            const event = await getEventByEventName('event4')
            setEventJson(event)
            setLoadingEventJson(false)
        }
        fetchEventJson()
    }, [])

    if (isEventError) {
        // TODO: redirect to main screen
        return (
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Heading1>Level not found</Heading1>
            </div>
        )
    }
    if (event === null) {
        return <Loader>Loading...</Loader>
    }

    return (
        <main className="flex flex-col">
            <div>
                {loadingEventJson ? (
                    <Loader>Loading event data...</Loader>
                ) : (
                    <pre>{JSON.stringify(event, null, 2)}</pre>
                )}
            </div>
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
                    handleWinner={() => {}}
                    totalHp={totalHp}
                    setTotalHp={setTotalHp}
                    numLegs={numLegs}
                    setNumLegs={setNumLegs}
                    setTimeDescription={setTimeDescription}
                />
            </div>
        </main>
    )
}
