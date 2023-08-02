import React, { useEffect, useState } from 'react'
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
import { getTopTenByDifficulty, PlayerResponse } from '../../api/playerScoreApi'
import { generateKey } from '../../utils/generateUniqueKey'

type Props = {
    difficulty: string
}

export const LeaderBoard = ({ difficulty }: Props): JSX.Element => {
    const [players, setPlayers] = useState<PlayerResponse[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopTenByDifficulty(difficulty)
            setPlayers(data)
        }

        fetchData()
    }, [difficulty])
    if (players === undefined) {
        return <p>Laster inn...</p>
    }
    return (
        <>
            <Heading2>Poengtavle - {difficulty}</Heading2>
            <div className="leaderboard">
                <Table>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Rank</HeaderCell>
                            <HeaderCell>Navn</HeaderCell>
                            <HeaderCell>Poengsum</HeaderCell>
                            <HeaderCell>Vanskelighetsgrad</HeaderCell>
                            <HeaderCell>Spillertrekk</HeaderCell>
                            <HeaderCell>Total reisetid</HeaderCell>
                            <HeaderCell>Total spilletid</HeaderCell>
                            <HeaderCell>Fra</HeaderCell>
                            <HeaderCell>Til</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow
                                key={generateKey(
                                    player.score + player.nickname,
                                )}
                            >
                                <DataCell>{index + 1}</DataCell>
                                <DataCell>{player.nickname}</DataCell>
                                <DataCell>{player.score}</DataCell>
                                <DataCell>{player.difficulty}</DataCell>
                                <DataCell>{player.totalOptions}</DataCell>
                                <DataCell>{player.totalTravelTime}</DataCell>
                                <DataCell>{player.totalPlaytime}</DataCell>
                                <DataCell>
                                    {player.fromDestination.destination}
                                </DataCell>
                                <DataCell>
                                    {player.toDestination.destination}
                                </DataCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
