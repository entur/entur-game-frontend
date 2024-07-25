'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    BlockquoteFooter,
    Heading1,
    LeadParagraph,
    SubParagraph,
} from '@entur/typography'
import { Modal } from '@entur/modal'
import { Button } from '@entur/button'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import { useEventName } from '@/lib/hooks/useEventName'
import { Pagination } from '@entur/menu'
import Leaderboard from '../components/Leaderboard'
import useScores from '@/lib/hooks/useScores'

const GamePage: React.FC = (): JSX.Element => {
    const { eventName, isEventNameError } = useEventName()
    const [isOpen, setOpen] = useState<boolean>(false)
    const router = useRouter()

    const { scores, leader, showAlert, setShowAlert } = useScores()

    const [currentPage, setPage] = React.useState(1)
    const [results, setResults] = React.useState(10)
    const numberOfResults = scores.length
    const pageCount = Math.ceil(numberOfResults / results)

    //TODO: side oppdateres hver gang ny spiller legges til i db

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
                onClick={handleDrawWinner}
            >
                Trekk en vinner
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

export default GamePage
