'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    BlockquoteFooter,
    Heading1,
    LeadParagraph,
    Paragraph,
    SubParagraph,
} from '@entur/typography'
import { Modal } from '@entur/modal'
import { Button, SecondaryButton } from '@entur/button'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { useEventName } from '@/lib/hooks/useEventName'
import { Pagination } from '@entur/menu'
import Leaderboard from '../components/Leaderboard'
import { saveWinner, endActiveEvent } from '@/lib/api/eventApi'
import useScores from '@/lib/hooks/useScores'

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

    const handleDrawWinnerAndEndGame = async () => {
        if (scores.length === 0) {
            setShowAlert(true)
            return
        }

        setWinnerEndOpen(false)
        setModalOpen(true)

        if (!eventName || !leader?.player?.playerId) {
            setSaveWinnerError(true)
            return
        }

        const response = await saveWinner(eventName, leader.player.playerId)
        setSaveWinnerError(response.status !== 200)

        await endActiveEvent()
    }

    const handleDismiss = () => {
        setModalOpen(false)
        setEventNameError(true)
        window.location.reload()
    }

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
            <Modal
                open={isWinnerEndOpen}
                onDismiss={() => setWinnerEndOpen(false)}
                title="Trekk vinner og avslutt spill?"
                size="medium"
            >
                <Paragraph>
                    Når du trekker en vinner avsluttes spillet automatisk. Det
                    vil være mulig å gjenåpne spillet igjen på et senere
                    tidspunkt.
                </Paragraph>
                <div className="flex gap-4">
                    <Button
                        variant={'primary'}
                        className="max-w-[250px]"
                        onClick={handleDrawWinnerAndEndGame}
                        type="button"
                    >
                        Trekk vinner og avslutt
                    </Button>
                    <SecondaryButton
                        className="w-[81px]"
                        onClick={() => setWinnerEndOpen(false)}
                    >
                        Avbryt
                    </SecondaryButton>
                </div>
            </Modal>
            <Modal
                open={isModalOpen}
                onDismiss={handleDismiss}
                title={`Vinner: ${leader?.player.playerName}`}
                size="medium"
            >
                <p>E-post: {leader?.player.email}</p>
                <p>Telefon: {leader?.player.phoneNumber}</p>
                {isSaveWinnerError && (
                    <>
                        <br />
                        <SmallAlertBox
                            variant="warning"
                            width="fit-content"
                            margin="top"
                        >
                            Det oppsto en feil ved lagring av vinner.
                        </SmallAlertBox>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default GamePage
