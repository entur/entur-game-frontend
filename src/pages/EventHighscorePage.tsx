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
import { sprinkleEmojis } from 'emoji-sprinkle'

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
    let winner = ''
    if (localStorage.getItem("winner") !== null) {
        winner = JSON.parse(localStorage.getItem("winner")!)
    } else {
        const winners = players.filter((player) => player.rank === 1)
        const winnerIndex = Math.floor(Math.random() * winners.length)
        const winnerPlayer = winners[winnerIndex]
        winner = winnerPlayer.name
        localStorage.setItem("winner", JSON.stringify(winner))
    }




    const now = new Date();
    const fourPM = new Date();
    fourPM.setHours(16, 0, 0, 0);
    console.log(now);
    console.log(fourPM);


    if (now.getTime() > fourPM.getTime()) {
        //run this every 5 seconds
        setTimeout(() => {
            window.location.reload();
        }, 5000);

        sprinkleEmojis({
            emoji: '🎉',
            count: 50,
            fade: 10,
            fontSize: 30,
        })
        return (
            <>
                <EnInsertTur />
                <br />
                <br />
                <br />
                <br />
                <Heading1 className="text-white text-center">Gratulerer <span className="text-coral text-center">{winner} </span> </Heading1>
                <Heading1 className="text-white text-center">Du vant Sparkesykkelen!</Heading1>

            </>
        )
    } else {
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
}
export default EventHighscorePage
