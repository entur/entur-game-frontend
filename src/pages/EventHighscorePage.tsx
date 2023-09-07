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
import { PrimaryButton, SuccessButton } from '@entur/button'

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
    let winners = players.filter((player) => player.rank === 1)
    if (localStorage.getItem("winner") !== null) {
        winner = JSON.parse(localStorage.getItem("winner")!)
    } else {
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

        sprinkleEmojis({
            emoji: '🎉',
            count: 50,
            fade: 10,
            fontSize: 30,
        })
        if (localStorage.getItem("won") !== "true") {
            console.log("76");

            return (
                <>
                    <div className="grid grid-cols-3 gap-4">

                        {winners.map((player, index) => (
                            <Paragraph className="text-white text-center text-9xl"> {player.name.substring(0, player.name.indexOf(' '))}<span className="text-coral text-center text-9xl"> {player.name.substring(player.name.indexOf(' ') + 1)} </span> </Paragraph>
                        ))}
                    </ div>
                    <SuccessButton className='w-96 h-64 text-center place-self-center mt-20 rounded-3xl' onClick={() => {
                        localStorage.setItem("won", "true")
                        window.location.reload()
                    }}><Paragraph className="text-black text-center text-7xl"> Trekk Vinner!  </Paragraph> </SuccessButton>
                </>
            )

        } else {

            return (
                <>
                    <EnInsertTur />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Heading1 className="text-white text-center text-9xl">Gratulerer <span className="text-coral text-center text-9xl">{winner} </span> </Heading1>
                    <Heading1 className="text-white text-center text-9xl">Du vant Sparkesykkelen!</Heading1>

                </>
            )
        }
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
