'use client'

import { Heading1, Heading2, Heading4, LeadParagraph } from '@entur/typography'
import { AddIcon, AdjustmentsIcon, BulletListIcon } from '@entur/icons'
import { Contrast, NavigationCard } from '@entur/layout'
import { CopyableText } from '@entur/alert'
import BackgroundAdmin from '@/lib/assets/images/BackgroundAdmin.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@entur/button'

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
            <div className="flex flex-col p-12">
                <NavigationCard
                    className="flex max-w-lg max-h-20"
                    title="Opprett spill"
                    titleIcon={<AddIcon className="flex items-center" />}
                    href="http://localhost:3000/admin/create-game"
                    compact
                >
                    Her oppretter du en ny rute. Du velger hvor og når ruten
                    begynner, og hvor den skal ende.
                </NavigationCard>
                <div className="flex mt-12 gap-6">
                    <Heading2 margin="none">Aktivt spill</Heading2>
                    <CopyableText
                        className="max-w-96 h-8"
                        successHeading="Lenke kopiert!"
                        successMessage=" "
                    >
                        localhost:3000
                    </CopyableText>
                </div>
                <Button variant={'primary'} className="max-w-56">
                    Trekk vinner og avslutt spill
                </Button>
            </div>
        </div>
    )
}
