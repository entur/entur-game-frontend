import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@entur/form';
import { SuccessButton } from '@entur/button';
import { Heading2, LeadParagraph,  } from '@entur/typography';
import { AdjustmentsIcon, BulletListIcon } from '@entur/icons';
import { Contrast, NavigationCard } from '@entur/layout';
import { useBackground } from '../contexts/backgroundContext'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar';

export function AdminPage(): ReactElement {
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
            <AdminNavBar></AdminNavBar>
            <div className='flex items-center justify-center'>
                <Heading2>
                    Spillets admin-panel
                </Heading2>
            </div>
            <div className='flex items-center justify-center'>
                <LeadParagraph>Konfigurer nye ruter og se nåværende leaderboard</LeadParagraph>
            </div>
            <div className='flex flex-row items center'> 
                <NavigationCard 
                    title="Opprett rute" 
                    titleIcon={<AdjustmentsIcon/>} 
                    href="https://om.entur.no/reisende/reiseplanleggeren/">
                        Her oppretter du en ny rute.  Du velger hvor og når ruten begynner, og hvor den skal ende. 
                </NavigationCard>
                <NavigationCard 
                    title="Leaderboard" 
                    titleIcon={<BulletListIcon/>}  
                    href="https://om.entur.no/reisende/reiseplanleggeren/">
                        Her har du oversikt over alle lagrede poengsummer og mulighet til å trekke en vinner blandt de beste poengsummene. 
                </NavigationCard>
            </div>
        </div>
    );
}