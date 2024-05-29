import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading1 } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '../components/Game/GameScreen'
import { Level, EASY } from '../constant/levels'
import GameNavBar from '../components/NavBar/GameNavBar'
import { useBackground } from '../contexts/backgroundContext'
import { getGameMode } from '../api/gameModeApi'

export function GamePage(): JSX.Element {
    const [totalHp, setTotalHp] = useState<number>(2)
    const { difficulty } = useParams()
    const [isLevelError, setLevelError] = useState<boolean>(false)
    const [level, setLevel] = useState<Level | null>(null)
    const [startTimer, setStartTimer] = useState<number>(0)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [timeDescription, setTimeDescription] = useState<string>('')
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-90')
        setStartTimer(Date.now())
        return () => setBackgroundColor('bg-main-blue')
    }, [setBackgroundColor])

    useEffect(() => {
        async function getData() {
            const gameMode = await getGameMode(difficulty ?? 'Lett')
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
                {level === null ? (
                    <Loader>Loading...</Loader>
                ) : (
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
                )}
            </div>
        </>
    )
}
