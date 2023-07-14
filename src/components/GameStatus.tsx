import React from 'react'
import { Label } from '@entur/typography'

import Heart from '../assets/icons/Heart.svg'
import DeadHeart from '../assets/icons/DeadHeart.svg'

type Props = {
    description: string
    totalHealth: number
}

function GameStatus({ description, totalHealth }: Props): React.ReactElement {
    return (
        <div className="max-w-3xl mx-auto border-2 border-blue-70 rounded">
            <div className="flex flex-row pt-5 pr-8 pl-8 pb-5">
                <span>
                    <Label className="text-blue-50">Din reise</Label>
                    <p className="text-blue-main">{description}</p>
                </span>
                <div className="self-center ml-20 w-0.5 h-11 bg-blue-80"></div>
                <div className="flex flex-col ml-8">
                    <Label className="text-blue-50">Liv</Label>
                    <div className="flex flex-row">
                        {Array.from(Array(totalHealth), () => {
                            return (
                                <img
                                    src={Heart}
                                    alt="heart"
                                    className="w-6 h-6"
                                />
                            )
                        })}
                        {Array.from(Array(3 - totalHealth), () => {
                            return (
                                <img
                                    src={DeadHeart}
                                    alt="dead heart"
                                    className="w-6 h-6"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameStatus
