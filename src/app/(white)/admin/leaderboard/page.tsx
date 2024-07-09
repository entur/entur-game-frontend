'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'
import { Modal } from '@entur/modal'
import { DataCell, HeaderCell, Table, TableBody, TableHead, TableRow } from '@entur/table'
import { Button } from '@entur/button'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { PlayerScore, Score } from '@/lib/types/types'
import { getPlayerScoresByActiveEvent } from '@/lib/api/playerScoreApi'
import { getActiveEvent } from '@/lib/api/eventApi'
import { Badge } from '@entur/layout'
import { Pagination } from '@entur/menu'

export default function GamePage(): JSX.Element {
    const [eventName, setEventName] = useState<string | null>(null)
    const [scores, setScores] = useState<PlayerScore[]>([]) 
    const [isEventNameError, setEventNameError] = useState<boolean>(false)
    const [leader, setLeader] = useState<PlayerScore | null>(null)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const router = useRouter()

    const [currentPage, setPage] = React.useState(1)
    const [results, setResults] = React.useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)

    //TODO: side oppdateres hver gang ny spiller legges til i db

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
                setShowAlert(false)
            }
        }
        getScores()
    }, [])

    const calculateRank = (currentPage: number, results: number, array: PlayerScore[], index: any, score: Score) => {
        return (currentPage - 1) * results + array.slice(0, index).filter((item: { scoreValue: number }) => item.scoreValue > score.scoreValue).length + 1
    }

    const handleDrawWinner = () => {
        if (scores.length === 0) {
            setShowAlert(true)
        } else {
            setOpen(true)
        }
    }

    if (eventName === null) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <Loader>Laster...</Loader>
            </div>
        )
    }

    if (isEventNameError) {
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
                <Button width="auto" variant="success" size="medium" onClick={handleDrawWinner} >
                    Trekk en vinner
                </Button>
            {showAlert && (
                <div className="pt-12">
                    <SmallAlertBox variant="negative" width="fit-content">
                        Minst én spiller kreves for å trekke vinner.
                    </SmallAlertBox>
                </div>
            )}
            <br/>
            <br/>
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
                    {scores.length === 0 ? (
                        <DataCell colSpan={4}>
                            <Badge variant="information" type="status">Ingen spillere ennå</Badge>
                        </DataCell>
                    ) : (
                        scores.slice((currentPage - 1) * results, currentPage * results)
                          .map((score, index, array) => {
                            const rank = calculateRank(currentPage, results,  array, index, score)
                            return (
                                <TableRow key={index}>
                                    <DataCell>{rank}</DataCell>
                                    <DataCell>{score.player.playerName}</DataCell>
                                    <DataCell>{score.totalTravelTime}</DataCell>
                                    <DataCell>{score.scoreValue}</DataCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
            <div className="pt-12">
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={page => setPage(page)}
                    numberOfResults={numberOfResults}
                    resultsPerPage={results}
                    onResultsPerPageChange={e => setResults(e)}
                />
            </div>
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
