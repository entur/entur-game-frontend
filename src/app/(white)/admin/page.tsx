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

export default function AdminPage(): JSX.Element | null {
    const router = useRouter()

    const handleOnClick = () => {
        router.push('/')
    }

    return (
        <div>
            <Contrast>
                <div className="flex flex-col pt-12 pl-44 pb-12">
                    <Heading1 margin="top">
                        Sett opp og kontrollér spillet herfra
                    </Heading1>
                </div>
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
                <div className="flex flex-col max-w-md mt-10 gap-2">
                    <Button variant={'primary'} className="max-w-60">
                        Trekk vinner og avslutt spill
                    </Button>
                    <Paragraph className="mt-2">
                        Når du trykker på knappen, trekkes en tilfeldig vinner
                        blant spillerne med høyest poengsum.
                    </Paragraph>
                </div>
                <div className="mt-8">
                    <CompactLeaderboardPage />
                </div>
                <div className="flex flex-col mt-20">
                    <Heading2>Tidligere spill</Heading2>
                    <InactiveEventsList />
                </div>
            </div>
        </div>
    )
}
