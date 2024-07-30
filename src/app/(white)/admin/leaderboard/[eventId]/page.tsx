'use client'

import React, { useEffect, useState } from 'react'
import Leaderboard from '../../components/Leaderboard'
import { BackendEvent, PlayerScore } from '@/lib/types/types'
import { getScoresByEventId } from '@/lib/api/scoreApi'
import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Pagination } from '@entur/menu'
import { Button, SecondaryButton } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { deleteEvent, getEventById } from '@/lib/api/eventApi'
import { useRouter } from 'next/navigation'
import { WinnerModal } from '../../components/WinnerModal'

type EventPageProps = {
    params: {
        eventId: number
    }
}

const LeaderboardPage: React.FC<EventPageProps> = ({
    params,
}: EventPageProps) => {
    const [scores, setScores] = useState<PlayerScore[]>([])
    const [event, setEvent] = useState<BackendEvent | null>(null)
    const [currentPage, setPage] = useState(1)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [results, setResults] = useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)
    const { eventId } = params
    const router = useRouter()

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scores = await getScoresByEventId(eventId)
                if (scores && scores.length > 0) {
                    const sortedScores = scores.sort(
                        (a, b) =>
                            b.scoreValue - a.scoreValue ||
                            a.totalTravelTime - b.totalTravelTime,
                    )
                    setScores(sortedScores)
                }

                const eventResponse = await getEventById(eventId)
                if (eventResponse.success && eventResponse.data) {
                    setEvent(eventResponse.data)
                } else {
                    console.error('Failed to fetch event details')
                }
            } catch (error) {
                console.error('Error fetching scores:', error)
            }
        }

        if (eventId) {
            fetchScores()
        }
    }, [eventId])

    const handleDelete = async () => {
        try {
            if (eventId !== undefined) {
                await deleteEvent(eventId)
            }
            router.push('/admin')
        } catch (error) {
            console.error('Error deleting event:', error)
        }
    }

    return (
        <div className="flex flex-col mx-40">
            <div className="flex flex-col pb-4 mt-16">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <Heading1>{event?.eventName}</Heading1>
                <LeadParagraph margin="bottom">
                    Se resultater fra avsluttet spill
                </LeadParagraph>
                <div className="flex gap-6 mb-20">
                    <Button variant="negative" onClick={handleDelete}>
                        <DeleteIcon className="inline align-baseline" />
                        Slett spill
                    </Button>
                    <SecondaryButton onClick={() => setOpen(true)}>
                        Vis vinner
                    </SecondaryButton>
                </div>
            </div>
            <Leaderboard
                scores={scores}
                currentPage={currentPage}
                results={results}
            />
            <div className="pt-12 mb-12">
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={setPage}
                    numberOfResults={numberOfResults}
                    resultsPerPage={results}
                    onResultsPerPageChange={setResults}
                />
            </div>
            <WinnerModal
                isModalOpen={isOpen}
                handleDismiss={() => setOpen(false)}
                leader={scores.length > 0 ? scores[0] : null}
                isSaveWinnerError={false}
            />
        </div>
    )
}

export default LeaderboardPage
