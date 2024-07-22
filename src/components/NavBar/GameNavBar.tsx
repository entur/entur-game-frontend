import React, { ReactElement } from 'react'
import GameStatus from '../GameStatus'

type Props = {
    numLegs: number
    usedTime: number
    maxTime: number
}

function GameNavBar({ numLegs, usedTime, maxTime }: Props): ReactElement {
    return (
        <div className="flex flex-row pt-4 justify-between ">
            <div className="flex-grow " />
            <GameStatus
                className="mr-4 mt-[-70px]"
                numLegs={numLegs}
                usedTime={usedTime}
                maxTime={maxTime}
            />
        </div>
    )
}

export default GameNavBar
