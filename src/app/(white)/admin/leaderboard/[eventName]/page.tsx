'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'

import { getEventByEventName } from '@/lib/api/eventApi'
import { Event, PlayerScore} from '@/lib/types/types'
import { DataCell, HeaderCell, Table, TableBody, TableHead, TableRow } from '@entur/table';
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'

export default function GamePage(): JSX.Element {

     // const { eventName } : {eventName: string} = useParams() TODO: kanskje behold

    const [score, setScore] = useState<PlayerScore | null>(null) 
    const [isScoreError, setScoreError] = useState<boolean>(false)

    useEffect(() => {
        async function getScore() {
            const score = await getPlayerScoresByActiveEvent()
            console.log("print score")
            console.log(score)
            if (score === null) {
                setScoreError(true)
                return
            } else {
                setScoreError(false)
                setScore(score[0])
            }
            
        }
        getScore()
    }, [])


    if (isScoreError || score === null) {
        // TODO: redirect to main screen
        return (
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Heading1>Aktivt event ikke funnet</Heading1>
            </div>
        )
    }

    return (
        <div className="max-w-screen ml-56 p-4 ">
            <BlockquoteFooter>Ledertavle</BlockquoteFooter>
            <Heading1>Arendal stasjon - Trondheim S</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>
                    Ledertavle for nåværende rute
                </LeadParagraph>
            </div>
            <Table>
            <TableHead>
                <TableRow>
                <HeaderCell>Spiller</HeaderCell>
                <HeaderCell>Reisetid</HeaderCell>
                <HeaderCell>Poengsum</HeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <DataCell>{score.player.playerName}</DataCell>
                <DataCell>{score.totalTravelTime}</DataCell>
                <DataCell>{score.scoreValue}</DataCell>
                </TableRow>
                <TableRow>
                <DataCell>Tomas</DataCell>
                <DataCell>11.00</DataCell>
                <DataCell>Østerås</DataCell>
                </TableRow>
                <TableRow>
                <DataCell>Selma</DataCell>
                <DataCell>12.00</DataCell>
                <DataCell>Østerås</DataCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
    )
}