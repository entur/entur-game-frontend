'use client'

import React, { useEffect, useState } from 'react'
import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '@/components/Game/GameScreen'
import { Level, EASY } from '@/lib/constants/levels'
import GameNavBar from '@/components/NavBar/GameNavBar'
import { getGameMode } from '@/lib/api/gameModeApi'
import { useParams } from 'next/navigation'

type Params = {
    difficulty: string
}

export default function GamePage(): JSX.Element {
    const [totalHp, setTotalHp] = useState<number>(2)
    const params: Params = useParams()
    const [isLevelError, setLevelError] = useState<boolean>(false)
    const [level, setLevel] = useState<Level | null>(null)
    const [startTimer] = useState<number>(0)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [timeDescription, setTimeDescription] = useState<string>('')

    useEffect(() => {
        async function getData() {
            const gameMode = await getGameMode(params.difficulty)
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
    }, [])

    if (isLevelError) {
        //TODO: redirect to main screen
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
        <>
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
                    handleWinner={() => {}}
                    totalHp={totalHp}
                    setTotalHp={setTotalHp}
                    numLegs={numLegs}
                    setNumLegs={setNumLegs}
                    setTimeDescription={setTimeDescription}
                />
            </div>
        </>
    )
}
