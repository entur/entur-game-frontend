import React, { useEffect, useState } from 'react'
import { PlayerScore } from '@/lib/types/types'
import { getActiveScores } from '@/lib/api/scoreApi'
import Leaderboard from './Leaderboard'
import { Heading3 } from '@entur/typography'
import { useEventName } from '@/lib/hooks/useEventName'
import { BreadcrumbItem } from '@entur/menu'
import Link from 'next/link'
import { useStopPlaceNames } from '@/lib/hooks/useStopPlaceName'
import { TravelHeader } from '@entur/travel'

const CompactLeaderboardPage: React.FC = (): JSX.Element => {
    const [scores, setScores] = useState<PlayerScore[]>([])
    const { isEventNameError } = useEventName()
    const { startLocationName, endLocationName } = useStopPlaceNames()

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
        <div className="max-w-4xl">
            <div className="flex flex-col pb-4">
                <div className="bg-white rounded shadow-md p-6">
                    {isEventNameError ? (
                        <Heading3 margin="bottom">Ingen aktive spill</Heading3>
                    ) : (
                        <TravelHeader
                            size="large"
                            from={startLocationName}
                            to={endLocationName}
                            noWrap={true}
                        ></TravelHeader>
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
                            href="/admin/leaderboard"
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
