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
import { PlayerResponse } from '../api/playerScoreApi'
import { generateKey } from '../utils/generateUniqueKey'

enum Difficulty {
    Easy = 'Lett',
    Medium = 'Middels',
    Hard = 'Vanskelig',
    Event = 'Event',
}

export const EventHighscorePage = (): JSX.Element => {
    const [players, setPlayers] = useState<PlayerResponse[]>([])
    const difficulty = Difficulty.Medium
    function getNorwegianWeekday() {
        const today = new Date()
        const weekdays = [
            'Søndag',
            'Mandag',
            'Tirsdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Lørdag',
        ]
        const weekdayIndex = today.getDay()
        return weekdays[weekdayIndex]
    }

    function generateMockPlayers(count: number): PlayerResponse[] {
        const players: PlayerResponse[] = []

        for (let i = 0; i < count; i++) {
            const player: PlayerResponse = {
                name: `Player ${i + 1}`,
                score: Math.floor(Math.random() * 100),
                difficulty: 'Event',
                totalOptions: Math.floor(Math.random() * 100),
                totalTravelTime: Math.floor(Math.random() * 100),
                totalPlaytime: Math.floor(Math.random() * 100),
                fromDestination: {
                    id: 'fromId',
                    destination: 'fromDestination',
                },
                toDestination: { id: 'toId', destination: 'toDestination' },
                email: 'player' + i + '@mock.com',
                //set phone number to random 8 digit number
                phoneNumber: Math.floor(Math.random() * 100000000),
            }
            //sort players by score

            players.push(player)
        }
        players.sort((a, b) => b.score - a.score)

        return players
    }

    useEffect(() => {
        //     const fetchData = async () => {
        //         const data = await getTopTenByDifficulty(difficulty)
        //         setPlayers(data)
        //     }
        setPlayers(generateMockPlayers(100))
        //sort players by score

        //     fetchData()
    }, [difficulty])
    if (players === undefined) {
        return <p>Laster inn...</p>
    }
    function getPodium(index: number): JSX.Element {
        if (index === 0) {
            return <Paragraph className="text-white">🥇</Paragraph>
        } else if (index === 1) {
            return <Paragraph className="text-white">🥈</Paragraph>
        } else if (index === 2) {
            return <Paragraph className="text-white">🥉</Paragraph>
        } else {
            return <Paragraph className="text-white">{index + 1}</Paragraph>
        }
    }

    return (
        <>
            <Heading1 className="text-white">
                {getNorwegianWeekday()} - {import.meta.env.VITE_APP_EVENT_NAME}{' '}
                Førsteplass vinner el. Sparkesykkel!
            </Heading1>
            <div className="leaderboard text-white">
                <Table>
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
export default EventHighscorePage
