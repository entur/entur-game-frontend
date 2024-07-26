import React, { useState } from 'react'
import Leaderboard from './Leaderboard'
import { useEventName } from '@/lib/hooks/useEventName'
import { BreadcrumbItem } from '@entur/menu'
import Link from 'next/link'
import { useStopPlaceName } from '@/lib/hooks/useStopPlaceName'
import { TravelHeader } from '@entur/travel'
import { BannerAlertBox, SmallAlertBox } from '@entur/alert'
import useScores from '@/lib/hooks/useScores'
import { saveWinner, endActiveEvent } from '@/lib/api/eventApi'
import { Modal } from '@entur/modal'
import { Paragraph } from '@entur/typography'
import { Button, SecondaryButton } from '@entur/button'

const CompactLeaderboardPage: React.FC = (): JSX.Element => {
    const { isEventNameError, setEventNameError, eventName } = useEventName()
    const { startLocationName, endLocationName } = useStopPlaceName()
    const { scores, leader, setShowAlert } = useScores()
    const [isOpen, setOpen] = useState(false)
    const [isWinnerEndOpen, setWinnerEndOpen] = useState(false)
    const [isWinnerOpen, setWinnerOpen] = useState(false)
    const [isSaveWinnerError, setSaveWinnerError] = useState<boolean>(false)

    const handleDrawWinnerAndEndGame = async () => {
        if (scores.length === 0) {
            setShowAlert(true)
            return
        }

        setWinnerEndOpen(false)
        setWinnerOpen(true)

        if (!eventName || !leader?.player?.playerId) {
            setSaveWinnerError(true)
            return
        }

        const response = await saveWinner(eventName, leader.player.playerId)
        setSaveWinnerError(response.status !== 200)

        await endActiveEvent()
    }

    const handleEndGame = async () => {
        const result = await endActiveEvent()
        if (result.success) {
            setOpen(false)
            setEventNameError(true)
            window.location.reload()
        }
    }

    const handleDismiss = () => {
        setWinnerOpen(false)
        setEventNameError(true)
        window.location.reload()
    }

    return (
        <div>
            {isEventNameError ? (
                <BannerAlertBox
                    className="w-[640px]"
                    title="Det finnes ikke et aktivt spill for øyeblikket"
                    variant="information"
                >
                    Gå til “Opprett spill” for å opprette et nytt spill
                </BannerAlertBox>
            ) : (
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
                        <Modal
                            open={isWinnerEndOpen}
                            onDismiss={() => setWinnerEndOpen(false)}
                            title="Trekk vinner og avslutt spill?"
                            size="medium"
                        >
                            <Paragraph>
                                Når du trekker en vinner avsluttes spillet
                                automatisk. Det vil være mulig å gjenåpne
                                spillet igjen på et senere tidspunkt.
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
                        <Button
                            variant={'success'}
                            size="large"
                            className="max-w-[250px]"
                            onClick={() => setWinnerEndOpen(true)}
                            type="button"
                        >
                            Trekk vinner og avslutt spill
                        </Button>
                        <Paragraph margin="none" className="mt-2">
                            Vinneren trekkes tilfeldig blant spillerne med
                            høyest poengsum.
                        </Paragraph>
                        <Modal
                            open={isOpen}
                            onDismiss={() => setOpen(false)}
                            title="Avslutt spill uten å trekke vinner?"
                            size="medium"
                        >
                            <Paragraph>
                                Du er i ferd med å avslutte spillet uten å trekk
                                een vinner. Det vil være mulig å gjenåpne
                                spillet og trekke en vinner på et senere
                                tidspunkt.
                            </Paragraph>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="primary"
                                    className="max-w-[250px]"
                                    onClick={handleEndGame}
                                >
                                    Avslutt spill
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Avbryt
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
                    <Modal
                        open={isWinnerOpen}
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
            )}
        </div>
    )
}

export default CompactLeaderboardPage
