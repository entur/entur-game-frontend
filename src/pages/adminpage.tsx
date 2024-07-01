import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading1, LeadParagraph,  } from '@entur/typography';
import { AdjustmentsIcon, BulletListIcon } from '@entur/icons';
import { NavigationCard } from '@entur/layout';
import { useBackground } from '../contexts/backgroundContext'
import AdminLayout from '@/components/Layout/AdminLayout';

export function AdminPage(): JSX.Element  {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

    // må legge inn funksjonelitet for å hente fra API
    const navigate = useNavigate();

    // tailwing og styling på endres på
    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <Heading1> Spillets admin-panel</Heading1>
                <LeadParagraph>Konfigurer nye ruter og se nåværende leaderboard</LeadParagraph>
            </div>
            <div className='flex items-center gap-16 px-52 py-37 w-16 md:w-32 lg:w-48'> 
                <NavigationCard 
                    className='flex-1'
                    title="Opprett rute" 
                    titleIcon={<AdjustmentsIcon/>} 
                    href="https://om.entur.no/reisende/reiseplanleggeren/">
                        Her oppretter du en ny rute.  Du velger hvor og når ruten begynner, og hvor den skal ende. 
                </NavigationCard>
                <NavigationCard 
                    className='flex-1'
                    title="Leaderboard" 
                    titleIcon={<BulletListIcon/>}  
                    href="https://om.entur.no/reisende/reiseplanleggeren/">
                        Her har du oversikt over alle lagrede poengsummer og mulighet til å trekke en vinner blandt de beste poengsummene. 
                </NavigationCard>
            </div>
        </div>
    );
}