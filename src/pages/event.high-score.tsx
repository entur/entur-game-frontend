import React from 'react'
import { Heading1, Heading3 } from '@entur/typography'
import MockEvent from "../mock-api/event.json"
import MockPlayers from "../mock-api/player.json"
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    DataCell,
    HeaderCell,
} from '@entur/table'
import '@entur/table/dist/styles.css'
import { getByDifficulty } from '../api/playerScoreApi'
import { generateKey } from '../utils/generateUniqueKey'
import EnInsertTur from '../components/EnInsertTur'
import { Event } from '@/types/types'

import useSWR from 'swr'
import { getActiveGameModeEvent } from '../api/gameModeApi'
import {Player} from "@/types/types";
import {sortNumber} from "@/lib/sorters";

export const LeaderBoard = (): JSX.Element => {
    const { data: activeGameMode } = useSWR('/game-mode/active-event', () =>
        getActiveGameModeEvent(),
    )
    let { data: players } = useSWR(
        `/players/${activeGameMode !== undefined}`,
        () => getByDifficulty(activeGameMode?.difficulty ?? 'Lett', 200),
        { refreshInterval: 1000 * 10 },
    )

    const event: Event = MockEvent
    let mockPlayers: Player[] = MockPlayers

    if (mockPlayers === undefined) {
        return <p>Laster inn...</p>
    }

    mockPlayers = mockPlayers.filter((player) => player.score > 0)
    mockPlayers.sort((a, b) => sortNumber(a.score, b.score))

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
                    {mockPlayers.map((player, index) => (
                        <TableRow key={generateKey(player.score + player.playerName)}>
                            <DataCell>
                                <Heading1 className="text-white">
                                    {index + 1}
                                </Heading1>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.playerName}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.score}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalStepNumber}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalTravelTime}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalPlayTime}
                                </Heading3>
                            </DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
