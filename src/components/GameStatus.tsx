import React from 'react'
import { Heading5, Label } from '@entur/typography'
import { ClockIcon, TrackIcon, ValidTicketIcon } from '@entur/icons'
import { Loader } from '@entur/loader'
import { formatMilliseconds } from '@/lib/utils/dateFnsUtils'

type Props = {
    className?: string
    numLegs: number
    usedTime: number
    maxTime: number
}

function GameStatus({
    className = '',
    numLegs,
    usedTime,
    maxTime,
}: Props): React.ReactElement {
    const usedTimeFormatted = formatMilliseconds(usedTime);
    const timeLeftFormatted = formatMilliseconds(Math.max(0, maxTime - usedTime));

    return (
        <div className={className}>
            <div className="max-w-3xl mx-auto border-2 border-white rounded bg-blue-90 shadow-md">
                <div className="bg-blue-main text-white flex flex-row pt-5 pr-5 pl-8 pb-5">
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
                <div className="bg-blue-main text-white flex flex-row pt-5 pr-5 pl-8 pb-5">
                    <ValidTicketIcon className="w-6 h-6 pt-1" />
                    <Heading5
                        className="pt-1 text-white"
                        margin="none"
                    >
                        Billetten din utløper om: {timeLeftFormatted}
                    </Heading5>
                </div>
                <div className='bg-blue-main text-white'><Loader progress={Math.max(0, Math.ceil((maxTime - usedTime) / maxTime * 100))}></Loader></div>
            </div>
        </div>
    )
}

export default GameStatus
