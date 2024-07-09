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
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { getActiveEvent } from '@/lib/api/eventApi'
import { Badge } from '@entur/layout'

export default function GamePage(): JSX.Element {
    // const { eventName } : {eventName: string} = useParams() TODO: kanskje behold

    const [eventName, setEventName] = useState<string | null>(null)
    const [scores, setScores] = useState<PlayerScore[]>([]) 
    const [isEventNameError, setEventNameError] = useState<boolean>(false)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [leader, setLeader] = useState<PlayerScore | null>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        async function getEventName() {
            const eventName = await getActiveEvent()
            
            if (eventName === null ) {
                setEventNameError(true)
                return
            } else {
                setEventNameError(false)
                setEventName(eventName.eventName)
            }
        }
        getEventName()
    }, [])

    useEffect(() => {
        async function getScores() {
            const scores = await getPlayerScoresByActiveEvent()
            if (scores === null || scores.length === 0) {
                return
            } else {
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

    //TODO: plassering dersom flere har akkurat samme score?
    //TODO: prikker dersom mer enn 5

    if ( eventName === null ) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <Loader>Laster...</Loader>
            </div>
        )
    }
    
    if ( isEventNameError ) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <div className="pt-12">
                    <BannerAlertBox title="Ingen rute opprettet" variant="information">Opprett ny rute for å se ledertavle.</BannerAlertBox>
                </div>
                <div className="pt-12">
                    <Button width="auto" variant="primary" size="medium" onClick={() => router.push('/admin/create-journey')}>
                        Opprett rute
                    </Button>
                </div>
            </div>
        )
    }
    
    if ( leader === null ) {
    return (
        <div className="max-w-screen mx-56 p-4">
            <BlockquoteFooter>Ledertavle</BlockquoteFooter>
            <Heading1>{eventName}</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>
                    Ledertavle for nåværende rute
                </LeadParagraph>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <HeaderCell>Plassering</HeaderCell>
                        <HeaderCell>Spiller</HeaderCell>
                        <HeaderCell>Reisetid</HeaderCell>
                        <HeaderCell>Poengsum</HeaderCell>
                    </TableRow>
                </TableHead>
            </Table>
            <div className="pt-12">
                <Badge variant="information" type="status">Ingen spillere ennå</Badge>
            </div>
            <div className="pt-12">
                <Button width="auto" variant="success" size="medium" onClick={() => setShowAlert(true)}>
                    Trekk en vinner
                </Button>
            </div>
            {showAlert && (
                <div className="pt-12">
                    <SmallAlertBox variant="negative" width="fit-content">
                        Minst én spiller kreves for å trekke vinner.
                    </SmallAlertBox>
                </div>
            )}
        </div>
    )
    }

    return (
        <div className="max-w-screen mx-56 p-4">
            <BlockquoteFooter>Ledertavle</BlockquoteFooter>
            <Heading1>{eventName}</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>
                    Ledertavle for nåværende rute
                </LeadParagraph>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <HeaderCell>Plassering</HeaderCell>
                        <HeaderCell>Spiller</HeaderCell>
                        <HeaderCell>Reisetid</HeaderCell>
                        <HeaderCell>Poengsum</HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.slice(0, 5).map((score, index) => (
                        <TableRow key={index}>
                            <DataCell>{index+1}</DataCell>
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
