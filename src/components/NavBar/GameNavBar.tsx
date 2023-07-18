import React, { ReactElement } from 'react'
import EnturPartnerIcon from '../../assets/icons/EnturPartner.svg'
import GameStatus from '../GameStatus'

type Props = {
  description: string
  healthLeft: number
}

function GameNavBar({ description, healthLeft}: Props): ReactElement {
    return (
        <div className="flex flex-row pt-4 justify-between item-center">
            <div className="self-center ml-5 mr-5">
                <img src={EnturPartnerIcon} alt="entur partner" />
            </div>
            <GameStatus
                className="mr-4"
                description={description}
                healthLeft={healthLeft}
            />
        </div>
    )
}

export default GameNavBar
