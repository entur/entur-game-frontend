import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { useBackground } from '../contexts/backgroundContext'
import { BlockquoteFooter } from '@entur/typography'
import { TimePicker } from '@entur/datepicker'
import { now, ZonedDateTime } from '@internationalized/date'
import { SearchableDropdown } from '@entur/dropdown'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

export function AdminCreateJourney(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

    const [selected, setSelected] = useState(null)

    const [time, setTime] = useState<ZonedDateTime | null>(now('Europe/Oslo'))

    return (
        <div>
            <AdminNavBar></AdminNavBar>
            <div className="max-w-md mx-auto p-4">
                <BlockquoteFooter>Opprett Rute</BlockquoteFooter>
                <Heading1>Opprett en ny rute</Heading1>
                <LeadParagraph>
                    Konfigurer ny rute ved å angi start, mål og starttidspunkt
                </LeadParagraph>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg start og mål</Heading3>
                    <SearchableDropdown
                        label="Start"
                        items={[]}
                        selectedItem={selected}
                        prepend={<MapPinIcon></MapPinIcon>}
                        // onChange={setSelected}
                    />
                    <SearchableDropdown
                        label="Mål"
                        items={[]}
                        prepend={<DestinationIcon></DestinationIcon>}
                        selectedItem={selected}
                        //onChange={setSelected}
                    />
                </div>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg starttidspunkt</Heading3>
                    <TimePicker
                        label="Tid"
                        selectedTime={time}
                        locale="no-NB"
                        onChange={(time: ZonedDateTime | null) => setTime(time)}
                    />
                    <Button width="auto" variant="primary" size="medium">
                        Opprett rute
                    </Button>
                </div>
            </div>
        </div>
    )
}
