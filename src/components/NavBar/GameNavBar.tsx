import React, { ReactElement } from 'react'
import GameStatus from '../GameStatus'
import Link from 'next/link'
import Image from 'next/image'
import EnturPartnerIconDark from '@/lib/assets/icons/EnturPartnerDark.svg'

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
            <Link href="/" className="mr-20">
                <Image
                    className="cursor-pointer"
                    src={EnturPartnerIconDark}
                    alt="entur partner"
                />
            </Link>
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
