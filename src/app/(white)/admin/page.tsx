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
import { endActiveEvent } from '@/lib/api/eventApi'

export default function AdminPage(): JSX.Element | null {
    const router = useRouter()

    const handleOnClick = () => {
        router.push('/')
    }

    const handleEndGame = async () => {
        const result = await endActiveEvent()
        if (result.success) {
            alert(`Success: ${result.data}`)
        } else {
            alert(`Error: ${result.error}`)
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
                        <Button
                            variant={'success'}
                            size="large"
                            className="max-w-[250px]"
                        >
                            Trekk vinner og avslutt spill
                        </Button>
                        <Paragraph margin="none" className="mt-2">
                            Vinneren trekkes tilfeldig blant spillerne med
                            høyest poengsum.
                        </Paragraph>
                        <Button
                            variant="secondary"
                            size="large"
                            className="max-w-[250px] mt-6"
                            onClick={handleEndGame}
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
        </div>
    )
}
