import React, { useEffect, useState } from 'react'
import { BackendEvent, PlayerScore, TGeoresponse } from '@/lib/types/types'
import { getActiveScores } from '@/lib/api/scoreApi'
import Leaderboard from './Leaderboard'
import { Heading2, Heading3 } from '@entur/typography'
import { useEventName } from '@/lib/hooks/useEventName'
import { BreadcrumbItem } from '@entur/menu'
import Link from 'next/link'
import { getActiveEvent } from '@/lib/api/eventApi'

const CompactLeaderboardPage: React.FC = (): JSX.Element => {
    const [scores, setScores] = useState<PlayerScore[]>([])
    const { eventName, isEventNameError } = useEventName()
    const [startName, setStartName] = useState<string | null>(null)
    const [goalName, setGoalName] = useState<string | null>(null)

    useEffect(() => {
        const fetchScores = async () => {
            const scores = await getActiveScores()
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
        <div className="max-w-xl">
            <div className="flex flex-col pb-4">
                <div className="bg-white rounded shadow-md p-6">
                    {isEventNameError ? (
                        <Heading3 margin="bottom">Ingen aktive spill</Heading3>
                    ) : (
                        <Heading3 margin="bottom">{eventName}</Heading3>
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
