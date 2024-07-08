'use client'

//TODO: hele fil renames: [difficulty] -> [eventName] etterhvert 
import React from 'react'
import { Heading1, Heading3 } from '@entur/typography'
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    DataCell,
    HeaderCell,
} from '@entur/table'
import '@entur/table/dist/styles.css'
import EnInsertTur from '@/components/EnInsertTur'

import useSWR from 'swr'
import { sortNumber } from '@/lib/utils/sorters'
import { PlayerScore } from '@/lib/types/types'
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'

export default function EventHighScorePage(): JSX.Element {
    let { data: playerScores } = useSWR<PlayerScore[]>('/players', () =>
        getPlayerScoresByActiveEvent(),
    )

    if (playerScores === undefined) {
        return <p>Laster inn...</p>
    }

    playerScores = playerScores.filter(
        (playerScore) => playerScore.scoreValue > 0,
    )
    playerScores.sort((a, b) => sortNumber(a.scoreValue, b.scoreValue))

    return (
        <div
            className="h-full w-full scrollbar-hide"
            style={{ cursor: 'none' }}
        >
            <EnInsertTur />
            <Table className="text-white" spacing="small">
                <TableHead>
                    <TableRow>
                        <HeaderCell>
                            <Heading1 className="text-white/25">Rank</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className="text-white/25">Navn</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className="text-white/25">
                                Poengsum
                            </Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className="text-white/25">
                                Spillertrekk
                            </Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className="text-white/25">
                                Total reisetid
                            </Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className="text-white/25">
                                Total spilletid
                            </Heading1>
                        </HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playerScores.map((playerScore, index) => (
                        <TableRow key={playerScore.scoreId}>
                            <DataCell>
                                <Heading1 className="text-white">
                                    {index + 1}
                                </Heading1>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {playerScore.player.playerName}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {playerScore.scoreValue}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {playerScore.totalStepNumber}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {playerScore.totalTravelTime}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {playerScore.totalPlayTime}
                                </Heading3>
                            </DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
