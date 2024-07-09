'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'
import { Modal } from '@entur/modal'
import { DataCell, HeaderCell, Table, TableBody, TableHead, TableRow } from '@entur/table'
import { Button } from '@entur/button'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { PlayerScore } from '@/lib/types/types'
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'
import { getActiveEvent } from '@/lib/api/eventApi'

export default function GamePage(): JSX.Element {
    const [eventName, setEventName] = useState<string | null>(null)
    const [scores, setScores] = useState<PlayerScore[]>([]) 
    const [isEventNameError, setEventNameError] = useState<boolean>(false)
    const [leader, setLeader] = useState<PlayerScore | null>(null)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const getEventName = async () => {
            const event = await getActiveEvent()
            if (event) {
                setEventName(event.eventName)
                setEventNameError(false)
            } else {
                setEventNameError(true)
            }
        }
        getEventName()
    }, [])

    useEffect(() => {
        const getScores = async () => {
            const scores = await getPlayerScoresByActiveEvent()
            if (scores && scores.length > 0) {
                const sortedScores = scores.sort((a, b) => b.scoreValue - a.scoreValue || a.totalTravelTime - b.totalTravelTime)
                setScores(sortedScores)
                setLeader(sortedScores[0])
            }
        }
        getScores()
    }, [])




    const handleDrawWinner = () => {
        if (scores.length === 0) {
            setShowAlert(true)
        } else {
            setOpen(true)
        }
    };

    //TODO: plassering dersom flere har akkurat samme score?
    //TODO: prikker dersom mer enn 5
    //TODO: Minst èn spiller kreves feilmelding bør kanskje ha mulighet til å forsvinne
    //TODO: bør oppdateres hver gang db-en oppdateres

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
                    <BannerAlertBox title="Ingen rute opprettet" variant="information">
                        Opprett ny rute for å se ledertavle.
                    </BannerAlertBox>
                </div>
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
            <Heading1>{eventName}</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>Ledertavle for nåværende rute</LeadParagraph>
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
                            <DataCell>{index + 1}</DataCell>
                            <DataCell>{score.player.playerName}</DataCell>
                            <DataCell>{score.totalTravelTime}</DataCell>
                            <DataCell>{score.scoreValue}</DataCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="pt-12">
                <Button width="auto" variant="success" size="medium" onClick={handleDrawWinner}>
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
            <Modal
                open={isOpen}
                onDismiss={() => setOpen(false)}
                title={`Vinner: ${leader?.player.playerName}`}
                size="medium"
            >
                <p>E-post: {leader?.player.email}</p>
                <p>Telefon: {leader?.player.phoneNumber}</p>
            </Modal>
        </div>
    )
}
