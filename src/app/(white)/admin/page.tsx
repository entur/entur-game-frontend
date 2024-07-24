'use client'

import { Heading1, Heading2, Paragraph } from '@entur/typography'
import { AddIcon, ExternalIcon } from '@entur/icons'
import { Contrast, NavigationCard } from '@entur/layout'
import BackgroundAdmin from '@/lib/assets/images/BackgroundAdmin.svg'
import Image from 'next/image'
import { Button, SecondaryButton } from '@entur/button'
import CompactLeaderboardPage from './components/CompactLeaderboard'
import { useRouter } from 'next/navigation'
import InactiveEventsList from './components/InactiveEventsList'
import { endActiveEvent, getActiveEvent } from '@/lib/api/eventApi'
import { Modal } from '@entur/modal'
import { useEffect, useState } from 'react'
import { useEventName } from '@/lib/hooks/useEventName'
import useScores from '@/lib/hooks/useScores'

export default function AdminPage(): JSX.Element | null {
    const [isOpen, setOpen] = useState(false)
    const [isWinnerEndOpen, setWinnerEndOpen] = useState(false)
    const [isWinnerOpen, setWinnerOpen] = useState(false)
    const [isActiveEvent, setIsActiveEvent] = useState<boolean>(false)
    const router = useRouter()
    const { setEventNameError } = useEventName()
    const { scores, leader, setShowAlert } = useScores()

    const checkActiveEvent = async (): Promise<boolean> => {
        const result = await getActiveEvent()
        return result?.isActive ?? false
    }

    useEffect(() => {
        const fetchActiveEvent = async () => {
            const isActive = await checkActiveEvent()
            setIsActiveEvent(isActive)
        }
        fetchActiveEvent()
    }, [])

    const handleOnClick = () => {
        router.push('/')
    }

    const handleDrawWinnerAndEndGame = async () => {
        if (scores.length === 0) {
            setShowAlert(true)
        } else {
            setWinnerEndOpen(false)
            setWinnerOpen(true)
            await endActiveEvent()
        }
    }

    const handleEndGame = async () => {
        const result = await endActiveEvent()
        if (result.success) {
            setOpen(false)
            setEventNameError(true)
        }
    }

    return (
        <div>
            <Contrast>
                <Heading1 margin="top" className="pt-12 pl-44 pb-12">
                    Sett opp og kontrollér spillet herfra
                </Heading1>
            </Contrast>
            <Image className="w-full" src={BackgroundAdmin} alt="background" />
            <div className="flex flex-col p-12 ml-20">
                <NavigationCard
                    className="flex flex-row max-w-lg max-h-20"
                    title="Opprett spill"
                    titleIcon={<AddIcon className="inline align-baseline" />}
                    href="http://localhost:3000/admin/create-game"
                    compact
                ></NavigationCard>
                <div className="flex mt-20 gap-4 ">
                    <Heading2 margin="none">Aktivt spill</Heading2>
                    <SecondaryButton
                        className="max-w-60 inline align-baseline"
                        width="auto"
                        size="small"
                        onClick={handleOnClick}
                    >
                        <div className="flex gap-2 justify-center">
                            Til spillet! <ExternalIcon />
                        </div>
                    </SecondaryButton>
                </div>
                <div className="flex mt-10 gap-16">
                    <div className="min-w-[848px]">
                        <CompactLeaderboardPage />
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
                                    disabled={!isActiveEvent}
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
                </div>
                <div className="flex flex-col mt-20">
                    <Heading2>Tidligere spill</Heading2>
                    <InactiveEventsList />
                </div>
            </div>
            <Modal
                open={isWinnerOpen}
                onDismiss={() => setWinnerOpen(false)}
                title={`Vinner: ${leader?.player.playerName}`}
                size="medium"
            >
                <p>E-post: {leader?.player.email}</p>
                <p>Telefon: {leader?.player.phoneNumber}</p>
            </Modal>
        </div>
    )
}
