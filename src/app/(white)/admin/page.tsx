'use client'

import { Heading1, Heading2 } from '@entur/typography'
import { AddIcon, ExternalIcon } from '@entur/icons'
import { Contrast, NavigationCard } from '@entur/layout'
import BackgroundAdmin from '@/lib/assets/images/BackgroundAdmin.svg'
import Image from 'next/image'
import { SecondaryButton } from '@entur/button'
import CompactLeaderboardPage from './components/CompactLeaderboard'
import { useRouter } from 'next/navigation'
import InactiveEventsList from './components/InactiveEventsList'

export default function AdminPage(): JSX.Element | null {
    const router = useRouter()

    const handleToGame = () => {
        window.open('/', '_blank')
    }
    const handleToLeaderboard = () => {
        window.open('/leaderboard', '_blank')
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
                    onClick={() => router.push('/admin/create-game')}
                    compact
                ></NavigationCard>
                <div className="flex mt-20 gap-4 ">
                    <Heading2 margin="none">Aktivt spill</Heading2>
                    <SecondaryButton
                        className="max-w-60 inline align-baseline"
                        width="auto"
                        size="medium"
                        onClick={handleToGame}
                    >
                        <div className="flex gap-2 justify-center">
                            Til spillet! <ExternalIcon />
                        </div>
                    </SecondaryButton>
                    <SecondaryButton
                        className="max-w-60 inline align-baseline"
                        width="auto"
                        size="medium"
                        onClick={handleToLeaderboard}
                    >
                        <div className="flex gap-2 justify-center">
                            Ledertavlen til stand <ExternalIcon />
                        </div>
                    </SecondaryButton>
                </div>
                <div className="flex mt-10 gap-16">
                    <div className="min-w-[848px]">
                        <CompactLeaderboardPage />
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
