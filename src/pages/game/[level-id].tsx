import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Game from '../../components/Game/Game'
import { Level, EASY, ALL_LEVELS } from '../../constant/levels'

function GamePage(): JSX.Element {
    const { levelId } = useParams()
    const [isLevelError, setLevelError] = useState<boolean>(false)
    const [level, setLevel] = useState<Level>(EASY[0])
    const [startTimer, setStartTimer] = useState<number>(0)

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
        return <div>Level not found</div>
    }

    return (
        <div className="app">
            <Game
                nickname={''}
                level={level}
                startTimer={startTimer}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                handleWinner={() => {}}
            />
        </div>
    )
}

export default GamePage
