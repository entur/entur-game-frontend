import React from 'react'
import { Heading2 } from '@entur/typography'
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    DataCell,
    HeaderCell,
} from '@entur/table'
import '@entur/table/dist/styles.css'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

interface Player {
    id: string
    name: string
    score: number
    totalOptions: number
    totaltimeSpent: Date
    formDestination: string
    toDestination: string
}
export const players: Player[] = [
    {
        id: '1',
        name: 'Daniel',
        score: 100,
        totalOptions: 5,
        totaltimeSpent: new Date(),
        formDestination: 'Jernabanetorget',
        toDestination: 'Trondheim',
    },
    {
        id: '2',
        name: 'Kenneth',
        score: 90,
        totalOptions: 5,
        totaltimeSpent: new Date(),
        formDestination: 'Jernabanetorget',
        toDestination: 'Trondheim',
    },
    {
        id: '3',
        name: 'Artur',
        score: 80,
        totalOptions: 5,
        totaltimeSpent: new Date(),
        formDestination: 'Jernabanetorget',
        toDestination: 'Trondheim',
    },
]

type LeaderboardProps = {
    players: Player[]
}

function formatTime(value: Date | string): string {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'HH:mm', { locale: nb })
}

export const Leaderboard = ({ players }: LeaderboardProps) => {
    const sortedPlayers = players.sort((a, b) => b.score - a.score).slice(0, 10)

    return (
        <>
            <Heading2>Leaderboard</Heading2>
            <Table>
                <TableHead>
                    <TableRow>
                        <HeaderCell>Rank</HeaderCell>
                        <HeaderCell>Nickname</HeaderCell>
                        <HeaderCell>Score</HeaderCell>
                        <HeaderCell>Total Options</HeaderCell>
                        <HeaderCell>Total Time Spent</HeaderCell>
                        <HeaderCell>From Destination</HeaderCell>
                        <HeaderCell>To Destination</HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedPlayers.map((player, index) => (
                        <TableRow key={player.id}>
                            <DataCell>{index + 1}</DataCell>
                            <DataCell>{player.name}</DataCell>
                            <DataCell>{player.score}</DataCell>
                            <DataCell>{player.totalOptions}</DataCell>
                            <DataCell>
                                {formatTime(player.totaltimeSpent)}
                            </DataCell>
                            <DataCell>{player.formDestination}</DataCell>
                            <DataCell>{player.toDestination}</DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
