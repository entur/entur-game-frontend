'use client'

import React, { useState } from 'react'
import Leaderboard from '../../components/Leaderboard'
import { PlayerScore } from '@/lib/types/types'
import {
    BlockquoteFooter,
    Heading1,
    LeadParagraph,
    Paragraph,
} from '@entur/typography'
import { Pagination } from '@entur/menu'
import { Button, SecondaryButton } from '@entur/button'
import { DeleteIcon, ViewIcon } from '@entur/icons'
import { deleteEvent } from '@/lib/api/eventApi'
import { useRouter } from 'next/navigation'
import { WinnerModal } from '../../components/winnerModal'
import { calculateWinner, handleDismiss } from '@/lib/utils/handleWinner'
import { Modal } from '@entur/modal'

function PreviousLeaderboard({
    scores,
    eventName,
    eventId,
}: {
    scores: PlayerScore[]
    eventName: string
    eventId: number
}) {
    const [currentPage, setPage] = useState(1)
    const [isNewWinnerOpen, setNewWinnerOpen] = useState<boolean>(false)
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [results, setResults] = useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)
    const router = useRouter()
    const [isCurrentWinnerOpen, setCurrentWinnerOpen] = useState(false)
    const [isSaveWinnerError, setSaveWinnerError] = useState<boolean>(false)
    const leader = calculateWinner(scores)

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
                <Heading1>{eventName}</Heading1>
                <LeadParagraph margin="bottom">
                    Se resultater fra avsluttet spill
                </LeadParagraph>
                <div className="flex gap-6 mb-20">
                    <Modal
                        open={isDeleteOpen}
                        onDismiss={() => setDeleteOpen(false)}
                        title="Slette spill?"
                        size="medium"
                    >
                        <Paragraph>
                            Du er i ferd med å avslutte et spill, er du sikker
                            på dette?
                        </Paragraph>
                        <div className="flex gap-6">
                            <Button
                                variant="secondary"
                                onClick={() => setDeleteOpen(false)}
                            >
                                Lukk
                            </Button>
                            <Button
                                variant="negative"
                                onClick={() => handleDelete()}
                            >
                                <DeleteIcon className="inline align-baseline" />
                                Slett spill
                            </Button>
                        </div>
                    </Modal>
                    <Button
                        variant="negative"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <DeleteIcon className="inline align-baseline" />
                        Slett spill
                    </Button>
                    <SecondaryButton onClick={() => setCurrentWinnerOpen(true)}>
                        <ViewIcon className="inline align-baseline" />
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
                isModalOpen={isNewWinnerOpen}
                handleDismiss={() => setNewWinnerOpen(false)}
                leader={scores.length > 0 ? scores[0] : null}
                isSaveWinnerError={false}
            />
            <WinnerModal
                isModalOpen={isCurrentWinnerOpen}
                handleDismiss={() =>
                    handleDismiss(setCurrentWinnerOpen, setSaveWinnerError)
                }
                leader={leader}
                isSaveWinnerError={isSaveWinnerError}
            />
        </div>
    )
}

export default PreviousLeaderboard
