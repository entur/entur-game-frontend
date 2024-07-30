'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    BlockquoteFooter,
    Heading1,
    LeadParagraph,
    SubParagraph,
} from '@entur/typography'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { useEventName } from '@/lib/hooks/useEventName'
import { Pagination } from '@entur/menu'
import Leaderboard from '../components/Leaderboard'
import useScores from '@/lib/hooks/useScores'
import { Button } from '@entur/button'
import {
    handleDismiss,
    handleDrawWinnerAndEndGame,
} from '@/lib/utils/handleWinner'
import { WinnerWarningModal } from '../components/WinnerWarningModal'
import { WinnerModal } from '../components/WinnerModal'

const GamePage: React.FC = (): JSX.Element => {
    const { eventName, isEventNameError, setEventNameError } = useEventName()
    const [isWinnerEndOpen, setWinnerEndOpen] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [isSaveWinnerError, setSaveWinnerError] = useState<boolean>(false)
    const router = useRouter()

    const { scores, leader, showAlert, setShowAlert } = useScores()

    const [currentPage, setPage] = React.useState(1)
    const [results, setResults] = React.useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)

    if (eventName === null) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <BannerAlertBox
                    title="Det finnes ikke et aktivt spill for øyeblikket"
                    variant="information"
                    className="w-[640px] mt-2"
                >
                    Gå til “Opprett spill” for å opprette et nytt spill
                </BannerAlertBox>
            </div>
        )
    }

    if (isEventNameError) {
        return (
            <div className="max-w-screen mx-56 p-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <div className="pt-12">
                    <BannerAlertBox
                        title="Ingen rute opprettet"
                        variant="information"
                    >
                        Opprett ny rute for å se ledertavle.
                    </BannerAlertBox>
                </div>
                <div className="pt-12">
                    <Button
                        width="auto"
                        variant="primary"
                        size="medium"
                        onClick={() => router.push('/admin/create-game')}
                    >
                        Opprett rute
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-screen mx-56 p-4">
            <div className="flex flex-col pb-4">
                <BlockquoteFooter>Ledertavle</BlockquoteFooter>
                <Heading1 margin="none">{eventName}</Heading1>
                <LeadParagraph margin="bottom">
                    Ledertavle for nåværende spill
                </LeadParagraph>
            </div>
            <Button
                width="auto"
                variant="success"
                size="medium"
                onClick={() => setWinnerEndOpen(true)}
            >
                Trekk vinner og avslutt
            </Button>
            <SubParagraph className="w-96 pt-2">
                Ved å trykke på knappen trekkes en tilfeldig vinner blant
                spillerne med høyest poengsum.
            </SubParagraph>
            {showAlert && (
                <SmallAlertBox
                    variant="negative"
                    width="fit-content"
                    margin="top"
                >
                    Minst én spiller kreves for å trekke vinner.
                </SmallAlertBox>
            )}
            <br />
            <br />
            <Leaderboard
                scores={scores}
                currentPage={currentPage}
                results={results}
            />
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
            <WinnerWarningModal
                isWinnerEndOpen={isWinnerEndOpen}
                setWinnerEndOpen={setWinnerEndOpen}
                handleDrawWinnerAndEndGame={() =>
                    handleDrawWinnerAndEndGame(
                        scores,
                        setShowAlert,
                        eventName,
                        leader,
                        setSaveWinnerError,
                        setWinnerEndOpen,
                        setModalOpen,
                    )
                }
            />
            <WinnerModal
                isModalOpen={isModalOpen}
                handleDismiss={() =>
                    handleDismiss(setModalOpen, setEventNameError)
                }
                leader={leader}
                isSaveWinnerError={isSaveWinnerError}
            />
        </div>
    )
}

export default GamePage
