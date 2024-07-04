import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { useBackground } from '../contexts/backgroundContext'
import { BlockquoteFooter } from '@entur/typography'
import { TimePicker } from '@entur/datepicker'
import { now, ZonedDateTime } from '@internationalized/date'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'
import { data } from '@entur/tokens'

type TGeoresponse = {
    features: Array<{
        items: {
            id?: string
            name?: string
        }
    }>
}

const fetchItems = useCallback(
    async (inputValue: string): Promise<NormalizedDropdownItemType[]> => {
        console.log(inputValue)
        try {
            const response = await fetch(
                `https://api.staging.entur.io/geocoder/v1/autocomplete?text=${inputValue}&size=5&lang=no`,
                // Bruk signalet fra abortController for å avbryte utdaterte kall
            )
                .then((res) => res.json())
                .then((data: TGeoresponse) => {
                    return data.features.map(({ items }) => ({
                        value: items.id ?? '',
                        label: items.name ?? '',
                    }))
                })
            console.log(response)
            return response
            // const data = await response.json()
            // if (data.message !== undefined) return [data.message]

            // const processedData = data.products.map(
            //     (item: { title: String; id: String }) => {
            //         return { label: item.title, value: item.id }
            //     },
            // )
            // return processedData
        } catch (error) {
            // AbortError må sendes videre til komponenten for å håndtere cleanup riktig
            if (error === 'AbortError') throw error
            console.error('noe galt')
            return []
        }
    },
    [],
)

export function AdminCreateJourney(): ReactElement {
    const [selected, setSelected] = useState<NormalizedDropdownItemType | null>(
        null,
    )

    const [time, setTime] = useState<ZonedDateTime | null>(now('Europe/Oslo'))
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('$colors-brand-white')
        return () => setBackgroundColor('$colors-brand-white')
    }, [setBackgroundColor])

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
                        items={fetchItems}
                        selectedItem={selected}
                        prepend={<MapPinIcon></MapPinIcon>}
                        onChange={setSelected}
                    />
                    <SearchableDropdown
                        label="Mål"
                        items={fetchItems}
                        prepend={<DestinationIcon></DestinationIcon>}
                        selectedItem={selected}
                        onChange={setSelected}
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
