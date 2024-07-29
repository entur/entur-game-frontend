import React from 'react'
import {
    DataCell,
    HeaderCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from '@entur/table'
import { Badge } from '@entur/layout'
import { PlayerScore } from '@/lib/types/types'
import { calculateRank } from '@/lib/utils/calculateRank'
import { formatMilliseconds } from '@/lib/utils/dateFnsUtils'

interface LeaderboardProps {
    scores: PlayerScore[]
    currentPage: number
    results: number
    compact?: boolean
}

const Leaderboard: React.FC<LeaderboardProps> = ({
    scores,
    currentPage,
    results,
    compact = false,
}) => {
    return (
        <Table>
            <TableHead>
                <TableRow className="">
                    <HeaderCell>Plassering</HeaderCell>
                    <HeaderCell>Spiller</HeaderCell>
                    {!compact && <HeaderCell>Reisetid</HeaderCell>}
                    <HeaderCell>Poengsum</HeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {scores.length === 0 ? (
                    <TableRow>
                        <DataCell colSpan={4}>
                            <Badge variant="information" type="status">
                                Ingen spillere ennå
                            </Badge>
                        </DataCell>
                    </TableRow>
                ) : (
                    scores
                        .slice(
                            (currentPage - 1) * results,
                            currentPage * results,
                        )
                        .map((score, index, array) => {
                            const rank = calculateRank(
                                currentPage,
                                results,
                                array,
                                index,
                                score,
                            )
                            return (
                                <TableRow key={index}>
                                    <DataCell>{rank}</DataCell>
                                    <DataCell>
                                        {score.player.playerName}
                                    </DataCell>
                                    {!compact && (
                                        <DataCell>
                                            {formatMilliseconds(
                                                1000 * score.totalTravelTime,
                                            )}
                                        </DataCell>
                                    )}
                                    <DataCell>{score.scoreValue}</DataCell>
                                </TableRow>
                            )
                        })
                )}
            </TableBody>
        </Table>
    )
}

export default Leaderboard
