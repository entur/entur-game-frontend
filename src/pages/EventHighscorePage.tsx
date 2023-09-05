import React, { useEffect, useState } from 'react'
import { Heading1, Heading2, Heading3, Paragraph } from '@entur/typography'
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
import EnInsertTur from '../components/EnInsertTur'

enum Difficulty {
    Easy = 'Lett',
    Medium = 'Middels',
    Hard = 'Vanskelig',
    Event = 'Event',
}

export const EventHighscorePage = (): JSX.Element => {
    const [players, setPlayers] = useState<PlayerResponse[]>([])
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
    const difficulty = Difficulty.Event

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
        players[0].name = 'a'.repeat(50)
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


    return (
        <>
            <EnInsertTur />
            <br />
            <br />
            <br />
            <br />
            <Table className='text-white'>
                <TableHead>
                    <TableRow>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Rank</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Navn</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Poengsum</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Spillertrekk</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Total reisetid</Heading1>
                        </HeaderCell>
                        <HeaderCell>
                            <Heading1 className='text-white/25'>Total spilletid</Heading1>
                        </HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player, index) => (
                        <TableRow
                            key={generateKey(player.score + player.name)}
                        >
                            <DataCell><Heading1 className='text-white'>{index + 1}</Heading1></DataCell>
                            <DataCell><Heading3 className='text-white'>{player.name}</Heading3></DataCell>
                            <DataCell><Heading3 className='text-white'>{player.score}</Heading3></DataCell>
                            <DataCell><Heading3 className='text-white'>{player.totalOptions}</Heading3></DataCell>
                            <DataCell><Heading3 className='text-white'>{player.totalTravelTime}</Heading3></DataCell>
                            <DataCell><Heading3 className='text-white'>{player.totalPlaytime}</Heading3></DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default EventHighscorePage
