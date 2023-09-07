import React from 'react'
import { Heading1, Heading3, Paragraph } from '@entur/typography'
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
import useSWR from 'swr'

export const EventHighscorePage = (): JSX.Element => {
    let { data: players } = useSWR(
        '/players',
        () => getByDifficulty('Javazone42', 200),
        { refreshInterval: 1000 * 10 },
    )
    if (players === undefined) {
        return <p>Laster inn...</p>
    }

    players = players.map((player, index) => {
        if (index === 0) {
            player.rank = 1
        } else {
            if (players !== undefined) {
                if (player.score === players[index - 1].score) {
                    player.rank = players[index - 1].rank
                } else {
                    player.rank = index + 1
                }
            }
        }
        return player
    })

    players = players.filter((player) => player.score > 0)



    return (
        <div className="h-full w-full scrollbar-hide" style={{ cursor: "none" }}>
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
                    {players.map((player, index) => (
                        <TableRow key={generateKey(player.score + player.name)}>
                            <DataCell>
                                <Heading1 className="text-white">
                                    {player.rank}
                                </Heading1>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.name}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.score}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalOptions}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalTravelTime}
                                </Heading3>
                            </DataCell>
                            <DataCell>
                                <Heading3 className="text-white">
                                    {player.totalPlaytime}
                                </Heading3>
                            </DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
export default EventHighscorePage
