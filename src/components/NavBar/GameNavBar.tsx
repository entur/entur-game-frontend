import React, { ReactElement } from 'react'
import GameStatus from '../GameStatus'

type Props = {
    healthLeft: number
    numLegs: number
    timeDescription: string
}

function GameNavBar({
    healthLeft,
    numLegs,
    timeDescription,
}: Props): ReactElement {
    return (
        <div className="flex flex-row pt-4 justify-between ">
            <div className="flex-grow " />
            <GameStatus
                className="mr-4 mt-[-70px]"
                numLegs={numLegs}
                timeDescriptionUsed={timeDescription}
                healthLeft={healthLeft}
            />
        </div>
    )
}

export default GameNavBar
