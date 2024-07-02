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
import { getPlayerScoresByActiveEvent } from '../api/playerScoreApi'
import { generateKey } from '../utils/generateUniqueKey'
import EnInsertTur from '../components/EnInsertTur'
import { Score } from '@/types/types'

import useSWR from 'swr'

import { sortNumber } from '@/lib/sorters'

export const LeaderBoard = (): JSX.Element => {
    let { data: scores } = useSWR<Score[]>('/players', () =>
        getPlayerScoresByActiveEvent(),
    )

    if (scores === undefined) {
        return <p>Laster inn...</p>
    }

    scores = scores.filter((score) => score.scoreValue > 0)
    scores.sort((a, b) => sortNumber(a.scoreValue, b.scoreValue))

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
                    {scores.map((score, index) => (
                        <TableRow
                            key={generateKey(
                                score.scoreValue + score.player.playerName,
                            )}
                        >
                            <DataCell>
                                <Heading1 className="text-white">
                                    {index + 1}
                                </Heading1>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {score.player.playerName}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {score.scoreValue}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {score.totalStepNumber}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {score.totalTravelTime}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {score.totalPlayTime}
                                </Heading3>
                            </DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
