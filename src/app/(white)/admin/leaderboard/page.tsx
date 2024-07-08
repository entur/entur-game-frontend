'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'
import { Modal } from '@entur/modal'

import { PlayerScore } from '@/lib/types/types'
import { DataCell, HeaderCell, Table, TableBody, TableHead, TableRow } from '@entur/table'
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'
import { Button } from '@entur/button'
import { BannerAlertBox } from '@entur/alert'

export default function GamePage(): JSX.Element {
    // const { eventName } : {eventName: string} = useParams() TODO: kanskje behold

    const [scores, setScores] = useState<PlayerScore[]>([]) 
    const [isScoreError, setScoreError] = useState<boolean>(false)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [leader, setLeader] = useState<PlayerScore | null>(null) 
    const router = useRouter()

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
                const sortedScores = scores.sort((a, b) => {
                    if (a.scoreValue === b.scoreValue) {
                        if (a.totalTravelTime === b.totalTravelTime) {
                            return Math.random() - 0.5
                        }
                        return a.totalTravelTime - b.totalTravelTime
                    }
                    return b.scoreValue - a.scoreValue
                })
                setScores(sortedScores)
                setLeader(sortedScores[0])
            }
        }
        getScores()
    }, [])

    //TODO: fiks så man har en ledertavle også før det er noen som har spilt
    //TODO: andre logiske errors også du må skjekke først
    if ( isScoreError || scores.length === 0 || scores == null || leader == null) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <BannerAlertBox title="Ingen rute opprettet" variant="information">Opprett ny rute for å se ledertavle.</BannerAlertBox>
                <div className="pt-12">
                    <Button width="auto" variant="primary" size="medium" onClick={() => router.push('/admin/create-journey')}>
                        Opprett rute
                    </Button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="max-w-screen mx-56 p-4">
            <BlockquoteFooter>Ledertavle</BlockquoteFooter>
            <Heading1>{leader.event.eventName}</Heading1>
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
            </Table>
            <div className="pt-12">
                <Button width="auto" variant="success" size="medium" onClick={() => setOpen(true)}>
                    Trekk en vinner
                </Button>
            </div>
            <Modal
                open={isOpen}
                onDismiss={() => setOpen(false)}
                title={`Vinner: ${leader.player.playerName}`}
                size="medium"
            >
                <p>E-post: {leader.player.email}</p>
                <p>Telefon: {leader.player.phoneNumber}</p>
            </Modal>
        </div>
    )
}
