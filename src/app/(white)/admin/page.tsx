'use client'

import { Heading1, Heading4, LeadParagraph } from '@entur/typography'
import { AdjustmentsIcon, BulletListIcon } from '@entur/icons'
import { Contrast, NavigationCard } from '@entur/layout'
import { CopyableText } from '@entur/alert'
import BackgroundAdmin from '@/lib/assets/images/BackgroundAdmin.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function AdminPage(): JSX.Element {
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

            <div className="grid grid-cols-2 items-center gap-16 p-12 mr-20">
                <NavigationCard
                    className="h-full"
                    title="Opprett spill"
                    titleIcon={<AdjustmentsIcon />}
                    href="http://localhost:3000/admin/create-game"
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
            <div className="flex flex-col items-center justify-center mr-20 p-12">
                <Heading4>Lenke til aktivt spill</Heading4>
                <div className="mt-2">
                    <CopyableText
                        successHeading="Lenke kopiert!"
                        successMessage=" "
                    >
                        localhost:3000
                    </CopyableText>
                </div>
            </div>
        </div>
    )
}
