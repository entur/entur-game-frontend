import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@entur/form';
import { SuccessButton } from '@entur/button';
import { Heading1, Heading3, LeadParagraph } from '@entur/typography';
import { ForwardIcon, MapPinIcon, DestinationIcon } from '@entur/icons';
import { useBackground } from '../contexts/backgroundContext'
import { BlockquoteFooter } from '@entur/typography';

export function AdminCreateJourney(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

    // må legge inn funksjonelitet for å hente fra API
    const navigate = useNavigate();

    return (
        <div className='max-w-md mx-auto p-4'>
                <BlockquoteFooter>Opprett Rute</BlockquoteFooter>
                <Heading1>
                    Opprett en ny rute
                </Heading1>
                <LeadParagraph>Konfigurer ny rute ved å angi start, mål og starttidspunkt</LeadParagraph>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg start og mål</Heading3>
                    <TextField size="medium" label="Start" variant="information" prepend=<MapPinIcon/>> </TextField>
                    <TextField size="medium" label="Mål" variant="information" prepend=<DestinationIcon/>> </TextField>
                    <SuccessButton onClick={() => navigate('/')}> <ForwardIcon /></SuccessButton> 
                </div>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg starttidspunkt</Heading3>
                </div>
        </div>
    );
}