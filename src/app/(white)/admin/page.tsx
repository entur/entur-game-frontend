'use client'

import {
    Heading1,
    Heading2,
    Heading4,
    LeadParagraph,
    Paragraph,
} from '@entur/typography'
import { AddIcon } from '@entur/icons'
import { Contrast, NavigationCard } from '@entur/layout'
import { CopyableText } from '@entur/alert'
import BackgroundAdmin from '@/lib/assets/images/BackgroundAdmin.svg'
import Image from 'next/image'
import { Button } from '@entur/button'
import CompactLeaderboardPage from '@/components/CompactLeaderboard'

export default function AdminPage(): JSX.Element | null {
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
            <div className="flex flex-col p-12">
                <NavigationCard
                    className="flex flex-row max-w-lg max-h-20"
                    title="Opprett spill"
                    titleIcon={<AddIcon className="inline align-baseline" />}
                    href="http://localhost:3000/admin/create-game"
                    compact
                ></NavigationCard>
                <div className="flex mt-20 gap-6">
                    <Heading2 margin="none">Aktivt spill</Heading2>
                    <CopyableText
                        className="max-w-96"
                        successHeading="Lenke kopiert!"
                        successMessage=" "
                        textToCopy="localhost:3000"
                    >
                        Trykk her for å kopiere lenken!
                    </CopyableText>
                </div>
                <div className="flex flex-col max-w-md mt-10">
                    <Button variant={'primary'} className="max-w-60">
                        Trekk vinner og avslutt spill
                    </Button>
                    <Paragraph className="mt-2">
                        Når du trykker på knappen, trekkes en tilfeldig vinner
                        blant spillerne med høyest poengsum.
                    </Paragraph>
                </div>
                <div className="mt-8"></div>
                <div className="flex flex-col mt-20">
                    <Heading2>Tidligere spill</Heading2>
                    <CompactLeaderboardPage />
                </div>
            </div>
        </div>
    )
}
