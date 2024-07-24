import React from 'react'
import { Heading5, Label } from '@entur/typography'
import { ClockIcon, TrackIcon, ValidTicketIcon } from '@entur/icons'
import { formatMilliseconds } from '@/lib/utils/dateFnsUtils'
import CountdownBar from './CountdownBar'

type Props = {
    numLegs: number
    usedTime: number
    maxTime: number
}

function GameStatus({ numLegs, usedTime, maxTime }: Props): React.ReactElement {
    const usedTimeFormatted = formatMilliseconds(usedTime)
    const timeLeftFormatted = formatMilliseconds(
        Math.max(0, maxTime - usedTime),
    )

    return (
        <div className="flex flex-row pt-4 justify-between ">
            <div className=" bg-blue-main  text-white mr-4 mt-[-70px] max-w-3xl mx-auto border-2 border-white rounded ">
                <div className=" flex flex-row pt-3 pr-5 pl-5 pb-2">
                    <span>
                        <Label className="text-blue-80">Din reise</Label>
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-row gap-2 content-center">
                                <TrackIcon className="w-6 h-6 pt-1" />
                                <Heading5
                                    className="pt-1 text-white"
                                    margin="none"
                                >
                                    Steg: {numLegs}
                                </Heading5>
                            </div>
                            <div className="flex flex-row gap-2 content-center">
                                <ClockIcon className="w-6 h-6 pt-1" />
                                <Heading5
                                    className="pt-1 text-white"
                                    margin="none"
                                >
                                    Reisetid: {usedTimeFormatted}
                                </Heading5>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="flex flex-row pt-2 pr-5 pl-5 pb-1">
                    <ValidTicketIcon className="w-6 h-6 pt-1" />
                    <Heading5 className="pt-1 text-white ml-2" margin="none">
                        Billetten din utløper om: {timeLeftFormatted}
                    </Heading5>
                </div>
                <div className="pt-1 pr-5 pl-5 pb-5">
                    <CountdownBar maxTime={maxTime} usedTime={usedTime} />
                </div>
            </div>
        </div>
    )
}

export default GameStatus
