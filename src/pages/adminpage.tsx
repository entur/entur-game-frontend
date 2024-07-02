import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading1, LeadParagraph } from '@entur/typography'
import { AdjustmentsIcon, BulletListIcon } from '@entur/icons'
import { NavigationCard } from '@entur/layout'
import { useBackground } from '../contexts/backgroundContext'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

export function AdminPage(): JSX.Element {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

    // tailwing og styling på endres på
    return (
        <div>
            <AdminNavBar></AdminNavBar>
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
                    href="https://om.entur.no/reisende/reiseplanleggeren/"
                >
                    Her oppretter du en ny rute. Du velger hvor og når ruten
                    begynner, og hvor den skal ende.
                </NavigationCard>
                <NavigationCard
                    className="h-full"
                    title="Leaderboard"
                    titleIcon={<BulletListIcon />}
                    href="https://om.entur.no/reisende/reiseplanleggeren/"
                >
                    Her har du oversikt over alle lagrede poengsummer og
                    mulighet til å trekke en vinner blandt de beste
                    poengsummene.
                </NavigationCard>
            </div>
        </div>
    )
}
