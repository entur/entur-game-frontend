import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '../components/Game/GameScreen'
import GameNavBar from '../components/NavBar/GameNavBar'
import { useBackground } from '../contexts/backgroundContext' //TODO-later: hvorfor er det funksjon for backgrunnen???

import { Level, EASY } from '../constant/levels' //TODO: "Level" (også difficulty) -> eventname, dette må endres
import { getGameModeByDifficulty, getEventByEventName } from '../api/gameModeApi' //TODO: må også endres, gameMode -> event
import { Event } from '@/types/types'

export function GamePage(): JSX.Element {
    //visuals and game logic
    const [numLegs, setNumLegs] = useState<number>(0)
    const [startTimer, setStartTimer] = useState<number>(0)
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [totalHp, setTotalHp] = useState<number>(2)
    const { setBackgroundColor } = useBackground() //TODO-later: backgroundColor

    //event logic
    const { eventName } = useParams()
    const [isLevelError, setLevelError] = useState<boolean>(false) //TODO: level
    const [level, setLevel] = useState<Level | null>(null) //TODO: level
    const [eventJson, setEventJson] = useState<Event | null>(null)
    const [loadingEventJson, setLoadingEventJson] = useState<boolean>(true)

    useEffect(() => {
        setBackgroundColor('bg-blue-90')
        setStartTimer(Date.now())
        return () => setBackgroundColor('bg-main-blue')
    }, [setBackgroundColor])

    useEffect(() => {
        async function getData() {
            const gameMode = await getGameModeByDifficulty(eventName ?? 'Lett')
            if (gameMode === null) {
                setLevelError(true)
                return
            }
            if (gameMode.difficulty.toLowerCase() === 'lett') {
                setLevel({ ...gameMode, targets: EASY[0].targets }) // Fix targets to make it easier to win
            } else {
                setLevel(gameMode)
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

    if (isLevelError) {
        // TODO: redirect to main screen
        return (
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Heading1>Level not found</Heading1>
            </div>
        )
    }
    if (level === null) {
        return <Loader>Loading...</Loader>
    }

    return (
        <main className="flex flex-col">
            <p>{eventName}</p>
            <div>
                {loadingEventJson ? (
                    <Loader>Loading event data...</Loader>
                ) : (
                    <pre>{JSON.stringify(eventJson, null, 2)}</pre>
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
                    level={level}
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
