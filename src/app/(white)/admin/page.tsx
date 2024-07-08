'use client'

import { Heading1, LeadParagraph } from '@entur/typography'
import { AdjustmentsIcon, BulletListIcon } from '@entur/icons'
import { NavigationCard } from '@entur/layout'

export default function AdminPage(): JSX.Element {
    // tailwing og styling på endres på
    return (
        <div>
            <div className="flex flex-col items-center justify-center mr-20">
                <Heading1> Spillets admin-panel</Heading1>
                <LeadParagraph>
                    Konfigurer nye ruter og se nåværende leaderboard
                </LeadParagraph>
            </div>
            <div className="grid grid-cols-2 items-center gap-16 p-12 mr-20">
                <NavigationCard
                    className="h-full"
                    title="Opprett rute"
                    titleIcon={<AdjustmentsIcon />}
                    href="http://localhost:3000/admin/create-journey"
                >
                    Her oppretter du en ny rute. Du velger hvor og når ruten
                    begynner, og hvor den skal ende.
                </NavigationCard>
                <NavigationCard
                    className="h-full"
                    title="Ledertavle"
                    titleIcon={<BulletListIcon />}
                    href="http://localhost:3000/admin/leaderboard"
                >
                    Her har du oversikt over alle lagrede poengsummer og
                    mulighet til å trekke en vinner blandt de beste
                    poengsummene.
                </NavigationCard>
            </div>
        </div>
    )
}
