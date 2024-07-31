import React, { useState } from 'react'
import Leaderboard from './Leaderboard'
import { useEventName } from '@/lib/hooks/useEventName'
import { BreadcrumbItem } from '@entur/menu'
import Link from 'next/link'
import { useStopPlaceName } from '@/lib/hooks/useStopPlaceName'
import { TravelHeader } from '@entur/travel'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import useScores from '@/lib/hooks/useScores'
import { Button } from '@entur/button'
import { endActiveEvent } from '@/lib/api/eventApi'
import { WinnerWarningModal } from './WinnerWarningModal'
import {
    handleDismiss,
    handleDrawWinnerAndEndGame,
} from '@/lib/utils/handleWinner'
import { Paragraph } from '@entur/typography'
import { Modal } from '@entur/modal'
import { WinnerModal } from './WinnerModal'

const CompactLeaderboardPage: React.FC = (): JSX.Element => {
    const { eventName, isEventNameError, setEventNameError } = useEventName()
    const { startLocationName, endLocationName } = useStopPlaceName()
    const { scores, leader, showAlert, setShowAlert } = useScores()
    const [isOpen, setOpen] = useState(false)
    const [isWinnerEndOpen, setWinnerEndOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isSaveWinnerError, setSaveWinnerError] = useState<boolean>(false)

    const handleEndGame = async () => {
        const result = await endActiveEvent()
        if (result.success) {
            setOpen(false)
            setEventNameError(true)
            window.location.reload()
        }
    }

    if (isEventNameError) {
        return (
            <div>
                <BannerAlertBox
                    className="w-[640px]"
                    title="Det finnes ikke et aktivt spill for øyeblikket"
                    variant="information"
                >
                    Gå til “Opprett spill” for å opprette et nytt spill
                </BannerAlertBox>
            </div>
        )
    }

    return (
        <div className="flex pb-4 gap-16">
            <div className="bg-white rounded shadow-md p-6 min-w-[848px]">
                <TravelHeader
                    size="large"
                    from={startLocationName}
                    to={endLocationName}
                    noWrap={true}
                ></TravelHeader>
                <Leaderboard
                    scores={scores}
                    compact
                    currentPage={1}
                    results={5}
                />
                <div className="flex justify-end pt-6">
                    <BreadcrumbItem
                        className="inline align-baseline"
                        as={Link}
                        href="/admin/leaderboard"
                    >
                        Se fullstendig ledertavle
                    </BreadcrumbItem>
                </div>
            </div>
            <div className="flex flex-col max-w-md justify-items-end">
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
                <Button
                    variant={'success'}
                    size="large"
                    className="max-w-[250px]"
                    onClick={() => {
                        if (scores.length === 0) {
                            setShowAlert(true)
                        } else {
                            setWinnerEndOpen(true)
                        }
                    }}
                    type="button"
                >
                    Trekk vinner og avslutt spill
                </Button>
                {showAlert && (
                    <>
                        <br />
                        <SmallAlertBox
                            variant="negative"
                            width="fit-content"
                            margin="top"
                        >
                            Minst én spiller kreves for å trekke vinner.
                        </SmallAlertBox>
                    </>
                )}
                <Paragraph margin="none" className="mt-2">
                    Vinneren trekkes tilfeldig blant spillerne med høyest
                    poengsum.
                </Paragraph>
                <Modal
                    open={isOpen}
                    onDismiss={() => setOpen(false)}
                    title="Avslutt spill uten å trekke vinner?"
                    size="medium"
                >
                    <Paragraph>
                        Du er i ferd med å avslutte spillet uten å trekke en
                        vinner. Det vil ikke være mulig å trekke en vinner på et
                        senere tidspunkt.
                    </Paragraph>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            variant="primary"
                            className="max-w-[250px]"
                            onClick={handleEndGame}
                        >
                            Avslutt spill
                        </Button>
                    </div>
                </Modal>
                <Button
                    variant="secondary"
                    size="large"
                    className="max-w-[250px] mt-6"
                    onClick={() => setOpen(true)}
                    type="button"
                >
                    Avslutt spill
                </Button>
            </div>
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

export default CompactLeaderboardPage
