'use client'

import React from 'react'
import { Heading1, Heading3 } from '@entur/typography'
import { Contrast } from '@entur/layout'
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    DataCell,
    HeaderCell,
} from '@entur/table'

import useSWR from 'swr'
import { sortNumber } from '@/lib/utils/sorters'
import { PlayerScore } from '@/lib/types/types'
import { getActiveScores } from '@/lib/api/scoreApi'
import { BannerAlertBox } from '@entur/alert'
import { Loader } from '@entur/loader'

export default function EventHighScorePage(): JSX.Element {
    const {
        data: playerScores,
        isLoading,
        error,
    } = useSWR<PlayerScore[] | null>('/players', getActiveScores)

    if (isLoading) {
        return (
            <Contrast>
                <Loader>Laster inn ledertavle</Loader>
            </Contrast>
        )
    }

    if (playerScores === undefined || playerScores === null || error) {
        return (
            <Contrast>
                <BannerAlertBox
                    className="w-fit mx-auto"
                    title="Ukjent feil"
                    variant="negative"
                >
                    Noe gikk galt under henting av ledertavle.
                </BannerAlertBox>
            </Contrast>
        )
    }

    const filteredPlayerScores = playerScores
        .filter((playerScore) => playerScore.scoreValue > 0)
        .sort((a, b) => sortNumber(a.scoreValue, b.scoreValue))

    return (
        <div
            className="h-full w-full scrollbar-hide"
            style={{ cursor: 'none' }}
        >
            <Contrast className="relative flex flex-row place-items-center space-x-5 justify-center items-center">
                <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                    Ledertavle
                </Heading1>
            </Contrast>
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
                                Poengsum
                            </Heading1>
                        </HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPlayerScores.map((playerScore, index) => (
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
                                    {playerScore.scoreValue}
                                </Heading3>
                            </DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
