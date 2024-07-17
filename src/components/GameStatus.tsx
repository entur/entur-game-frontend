import React from 'react'
import { Heading5, Label } from '@entur/typography'
import { ClockIcon, TrackIcon } from '@entur/icons'
import { Loader } from '@entur/loader'

type Props = {
    className?: string
    timeDescriptionUsed: string
    numLegs: number
    usedTime: number
    maxTime: number
}

function formatTime(milliseconds: number) {
    let totalSeconds = Math.ceil(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${hours} timer ${minutes} minutter ${seconds} sekunder`;
}

function GameStatus({
    className = '',
    timeDescriptionUsed,
    numLegs,
    usedTime,
    maxTime,
}: Props): React.ReactElement {
    const formattedTimeLeft = formatTime(Math.max(0, maxTime - usedTime));

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
                </div>
                <div className="flex flex-row pt-5 pr-5 pl-8 pb-5">
                    <Label className="text-blue-50">Gjenstående tid: {formattedTimeLeft}</Label>
                </div>
                <span>
                    <Loader progress={Math.max(0, Math.ceil((maxTime - usedTime) / maxTime * 100))}></Loader>
                </span>
            </div>
        </div>
    )
}

export default GameStatus
