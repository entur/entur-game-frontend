import React, { useEffect, useState } from 'react'
import { Heading1, Paragraph } from '@entur/typography'
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    DataCell,
    HeaderCell,
} from '@entur/table'
import '@entur/table/dist/styles.css'
import { getByDifficulty, PlayerResponse } from '../api/playerScoreApi'
import { generateKey } from '../utils/generateUniqueKey'

export const ShownTell = (): JSX.Element => {
    const [players, setPlayers] = useState<PlayerResponse[]>([])
    const difficulty = 'Event'
    useEffect(() => {
        const fetchData = async () => {
            const data = await getByDifficulty(difficulty)
            setPlayers(data)
        }
        fetchData()
    }, [difficulty])
    if (players === undefined) {
        return <p>Laster inn...</p>
    }
    function getPodium(index: number): JSX.Element {
        if (index === 0) {
            return (<Paragraph className='text-white'>🥇</Paragraph>);
        } else if (index === 1) {
            return <Paragraph className='text-white'>🥈</Paragraph>;
        } else if (index === 2) {
            return <Paragraph className='text-white'>🥉</Paragraph>;
        } else {
            return <Paragraph className='text-white'>{index + 1}</Paragraph>;
        }
    }

    return (
        <>

            <div className="leaderboard text-white">
                <Heading1 className='text-white text-center '>{players[0]?.name} vinner Twist!</Heading1>
                <Table spacing={'small'}>
                    {/* <Table spacing={tableSpacing}> */}
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Rank</HeaderCell>
                            <HeaderCell>Navn</HeaderCell>
                            <HeaderCell>Poengsum</HeaderCell>
                            <HeaderCell>Spillertrekk</HeaderCell>
                            <HeaderCell>Total reisetid</HeaderCell>
                            <HeaderCell>Total spilletid</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow
                                key={generateKey(player.score + player.name)}
                            >
                                <DataCell>{getPodium(index)}</DataCell>
                                <DataCell>{player.name}</DataCell>
                                <DataCell>{player.score}</DataCell>
                                <DataCell>{player.totalOptions}</DataCell>
                                <DataCell>{player.totalTravelTime}</DataCell>
                                <DataCell>{player.totalPlaytime}</DataCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
export default ShownTell