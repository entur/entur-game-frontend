import React, { ReactElement } from 'react'
import EnturPartnerIcon from '../../assets/icons/EnturPartner.svg'
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
        <div className="flex flex-row pt-4 justify-between item-center">
            <div className="self-center ml-5 mr-5">
                <img src={EnturPartnerIcon} alt="entur partner" />
            </div>
            <GameStatus
                className="mr-4"
                description={`Du har reist ${numLegs} etappe og ${timeDescription}`}
                healthLeft={healthLeft}
            />
        </div>
    )
}

export default GameNavBar
