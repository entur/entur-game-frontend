'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'

import { PlayerScore } from '@/lib/types/types'
import { DataCell, HeaderCell, Table, TableBody, TableHead, TableRow } from '@entur/table';
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'
import { Button } from '@entur/button'

export default function GamePage(): JSX.Element {

    // const { eventName } : {eventName: string} = useParams() TODO: kanskje behold

    const [scores, setScores] = useState<PlayerScore[]>([]) 
    const [isScoreError, setScoreError] = useState<boolean>(false)

    useEffect(() => {
        async function getScores() {
            const scores = await getPlayerScoresByActiveEvent()
            console.log("print scores")
            console.log(scores)
            if (scores === null || scores.length === 0) {
                setScoreError(true)
                return
            } else {
                setScoreError(false)
                setScores(scores)
            }
        }
        getScores()
    }, [])


    if (isScoreError || scores.length === 0 || scores == null) {
        // TODO: redirect to main screen
        return (
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Heading1>Aktivt event ikke funnet</Heading1>
            </div>
        )
    }

    return (
        <div className="max-w-screen mx-56 p-4">
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
                    {scores.map((score, index) => (
                        <TableRow key={index}>
                            <DataCell>{score.player.playerName}</DataCell>
                            <DataCell>{score.totalTravelTime}</DataCell>
                            <DataCell>{score.scoreValue}</DataCell>
                        </TableRow>
                    ))}
                </TableBody>
                <div className="pt-12">
                    <Button width="auto" variant="success" size="medium">
                        Trekk en vinner
                    </Button>
                </div>
            </Table>
        </div>
    )
}
