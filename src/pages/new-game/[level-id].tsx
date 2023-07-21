import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Game from '../../components/Game/NewGame/NewGame'
import { Level, EASY, ALL_LEVELS } from '../../constant/levels'
import GameNavBar from '../../components/NavBar/GameNavBar'

function GamePage(): JSX.Element {
    const [totalHp, setTotalHp] = useState<number>(2)
    const { levelId } = useParams()
    const [isLevelError, setLevelError] = useState<boolean>(false)
    const [level, setLevel] = useState<Level>(EASY[0])
    const [startTimer, setStartTimer] = useState<number>(0)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [timeDescription, setTimeDescription] = useState<string>('')

    useEffect(() => {
        const level = ALL_LEVELS.find((level) => level.id === levelId)
        if (level === undefined) {
            setLevelError(true)
            return
        }
        setLevel(level)
        setStartTimer(Date.now())
    }, [])

    if (isLevelError) {
        //TODO: redirect to main screen
        return <div>Level not found</div>
    }

    return (
        <div className="bg-blue-90 sm:w-screen sm:h-screen">
            <GameNavBar
                healthLeft={totalHp + 1}
                numLegs={numLegs}
                timeDescription={timeDescription}
            />
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Game
                    nickname={''}
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
        </div>
    )
}

export default GamePage
