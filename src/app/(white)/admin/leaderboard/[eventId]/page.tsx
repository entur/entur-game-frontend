'use client'
import { useEffect, useState } from 'react'
import Leaderboard from '../../components/Leaderboard'
import { PlayerScore } from '@/lib/types/types'
import { useEventName } from '@/lib/hooks/useEventName'
import { getScoresEventId } from '@/lib/api/scoreApi'
import { Loader } from '@entur/loader'
import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Pagination } from '@entur/menu'
import { Button, SecondaryButton } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { useRouter } from 'next/navigation'
import { Modal } from '@entur/modal'
import { getEventByEventName } from '@/lib/api/eventApi'
import { TravelHeader } from '@entur/travel'
import { useInactiveStopPlaces } from '@/lib/hooks/useInactiveStopPlaceName'

interface LeaderboardPageProps {
    params: {
        eventId: string
    }
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
    params,
}): JSX.Element => {
    const { eventId } = params

    const [scores, setScores] = useState<PlayerScore[]>([])
    const [leader, setLeader] = useState<PlayerScore | null>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [currentPage, setPage] = useState(1)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [results, setResults] = useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)

    const fetchScores = async () => {
        try {
            if (!eventId || Array.isArray(eventId)) {
                throw new Error(
                    'Event ID is null, undefined, or not a valid string',
                )
            }
            const eventIdNumber = Number(eventId)
            const scores = await getScoresEventId(eventIdNumber)
            if (scores && scores.length > 0) {
                const sortedScores = scores.sort(
                    (a, b) =>
                        b.scoreValue - a.scoreValue ||
                        a.totalTravelTime - b.totalTravelTime,
                )
                setScores(sortedScores)
                setLeader(sortedScores[0])
                setShowAlert(false)
            }
        } catch (error) {
            console.error('Error fetching scores:', error)
        }
    }

    useEffect(() => {
        if (eventId) {
            fetchScores()
        }
    }, [eventId])

    // if (eventName === null) {
    //     return (
    //         <div className="max-w-screen mx-56 p-4">
    //             <BlockquoteFooter>Ledertavle</BlockquoteFooter>
    //             <Loader>Laster...</Loader>
    //         </div>
    //     )
    // }

    return (
        <div className="flex flex-col mx-40">
            <div className="flex flex-col pb-4 mt-16">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <Heading1>Reise</Heading1>
                <LeadParagraph margin="bottom">
                    Se resultater fra avsluttet spill
                </LeadParagraph>
                <div className="flex gap-6 mb-32">
                    <Button variant="negative">
                        <DeleteIcon className="inline align-baseline" />
                        Slett spill
                    </Button>
                    <SecondaryButton>Vis vinner</SecondaryButton>
                </div>
            </div>
            <Leaderboard
                scores={scores}
                currentPage={currentPage}
                results={results}
            ></Leaderboard>
            <div className="pt-12">
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={(page) => setPage(page)}
                    numberOfResults={numberOfResults}
                    resultsPerPage={results}
                    onResultsPerPageChange={(e) => setResults(e)}
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

export default LeaderboardPage
