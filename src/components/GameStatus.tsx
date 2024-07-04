import React from 'react'
import { Heading5, Label } from '@entur/typography'

import Heart from '@/lib/assets/icons/Heart.svg'
import DeadHeart from '@/lib/assets/icons/DeadHeart.svg'
import { generateKey } from '@/lib/utils/generateUniqueKey'
import { ClockIcon, TrackIcon } from '@entur/icons'
import Image from "next/image";

type Props = {
    className?: string
    timeDescriptionUsed: string
    numLegs: number
    healthLeft: number
}

function GameStatus({
    className = '',
    timeDescriptionUsed,
    numLegs,
    healthLeft,
}: Props): React.ReactElement {
    return (
        <div className={className}>
            <div className="max-w-3xl mx-auto border-2 border-blue-70 rounded bg-blue-90 shadow-md">
                <div className="flex flex-row pt-5 pr-5 pl-8 pb-5">
                    <span>
                        <Label className="text-blue-50">Din reise</Label>
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-row gap-2 content-center">
                                <TrackIcon className="w-6 h-6 pt-1" />
                                <Heading5
                                    className="pt-1 text-coral"
                                    margin="none"
                                >
                                    {numLegs}
                                </Heading5>
                            </div>
                            <div className="flex flex-row gap-2 content-center">
                                <ClockIcon className="w-6 h-6 pt-1" />
                                <Heading5
                                    className="pt-1 text-coral"
                                    margin="none"
                                >
                                    {timeDescriptionUsed}
                                </Heading5>
                            </div>
                        </div>
                    </span>
                    <div className="self-center ml-10 w-0.5 h-11 bg-blue-80" />
                    <div className="flex flex-col ml-8">
                        <Label className="text-blue-50" margin="none">
                            Liv
                        </Label>
                        <div className="flex flex-row pt-1">
                            {Array.from(Array(healthLeft), (_, k) => {
                                return (
                                    <Image
                                        key={generateKey(k.toString())}
                                        src={Heart}
                                        alt="heart"
                                        className="w-6 h-6"
                                    />
                                )
                            })}
                            {Array.from(Array(3 - healthLeft), (_, k) => {
                                return (
                                    <Image
                                        key={generateKey(k.toString())}
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
        </div>
    )
}

export default GameStatus
