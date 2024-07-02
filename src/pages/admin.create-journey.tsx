import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@entur/form';
import { SuccessButton } from '@entur/button';
import { Heading1, Heading3, LeadParagraph } from '@entur/typography';
import { ForwardIcon, MapPinIcon, DestinationIcon } from '@entur/icons';
import { useBackground } from '../contexts/backgroundContext'
import { BlockquoteFooter } from '@entur/typography';
import { TimePicker } from '@entur/datepicker';
import { now, ZonedDateTime } from '@internationalized/date';
import { SearchableDropdown } from '@entur/dropdown';

export function AdminCreateJourney(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

    const [selected, setSelected] = useState(null)
    const navigate = useNavigate();
    const [time, setTime] = useState<ZonedDateTime | null>(now('Europe/Oslo'))

    return (
        <div className='max-w-md mx-auto p-4'>
                <BlockquoteFooter>Opprett Rute</BlockquoteFooter>
                <Heading1>
                    Opprett en ny rute
                </Heading1>
                <LeadParagraph>Konfigurer ny rute ved å angi start, mål og starttidspunkt</LeadParagraph>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg start og mål</Heading3>
                    <SearchableDropdown
                        label="Start"
                        items={cities}
                        selectedItem={selected}
                        onChange={setSelected}
                        />
                    <TextField size="medium" label="Mål" variant="information"></TextField>
                    <SuccessButton onClick={() => navigate('/')}> <ForwardIcon /></SuccessButton> 
                </div>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg starttidspunkt</Heading3>
                    <TimePicker
                        label="Tid"
                        selectedTime={time}
                        onChange={(time: ZonedDateTime | null)=> setTime(time)}/>
                </div>
        </div>
    );
}
