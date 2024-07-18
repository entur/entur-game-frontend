import React, { useEffect, useState } from 'react'
import { PlayerScore } from '@/lib/types/types'
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'
import { Button } from '@entur/button'
import Leaderboard from './Leaderboard'
import { RightArrowIcon } from '@entur/icons'
import { Heading2 } from '@entur/typography'
import { useEventName } from '@/lib/hooks/useEventName'
import { BreadcrumbItem } from '@entur/menu'
import Link from 'next/link'

const CompactLeaderboardPage: React.FC = (): JSX.Element => {
    const [scores, setScores] = useState<PlayerScore[]>([])
    const { eventName, isEventNameError } = useEventName()

    useEffect(() => {
        const fetchScores = async () => {
            const scores = await getPlayerScoresByActiveEvent()
            if (scores && scores.length > 0) {
                const sortedScores = scores.sort(
                    (a, b) =>
                        b.scoreValue - a.scoreValue ||
                        a.totalTravelTime - b.totalTravelTime,
                )
                setScores(sortedScores)
            }
        }
        fetchScores()
    }, [])

    return (
        <div className="max-w-screen mx-56 p-4">
            <div className="flex flex-col pb-4">
                <div className="bg-white rounded shadow-md p-6">
                    {isEventNameError ? (
                        <Heading2 margin="bottom">Ingen aktive spill</Heading2>
                    ) : (
                        <Heading2 margin="bottom">{eventName}</Heading2>
                    )}
                    <Leaderboard
                        scores={scores}
                        compact
                        currentPage={1}
                        results={5}
                    />
                    <div className="flex justify-end pt-6">
                        <BreadcrumbItem
                            className="inline align-baseline"
                            as={Link}
                            href="/leaderboard"
                        >
                            Se fullstendig ledertavle
                        </BreadcrumbItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompactLeaderboardPage
