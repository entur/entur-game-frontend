import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { useBackground } from '../contexts/backgroundContext'
import { BlockquoteFooter } from '@entur/typography'
import { DatePicker, TimePicker } from '@entur/datepicker'
import { now, ZonedDateTime } from '@internationalized/date'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

type TGeoresponse = {
    features: Array<{
        properties: {
            id?: string
            name?: string
        }
    }>
}

export function AdminCreateJourney(): ReactElement {
    const fetchItems = useCallback(
        async (inputValue: string): Promise<NormalizedDropdownItemType[]> => {
            try {
                const response = await fetch(
                    `https://api.entur.io/geocoder/v1/autocomplete?text=${inputValue}&size=5&lang=no&layer=venue`,
                )
                const data: TGeoresponse = await response.json()
                console.log('Fetched data:', data)
                const mappedData = data.features.map((feature) => {
                    const { id, name } = feature.properties || {}
                    return {
                        label: name ?? '',
                        value: id ?? '',
                    }
                })
                console.log('Mapped data:', mappedData)
                return mappedData
            } catch (error) {
                if (error === 'AbortError') throw error
                console.error('Error fetching data:', error)
                return []
            }
        },
        [],
    )
    const [selectedStart, setSelectedStart] =
        useState<NormalizedDropdownItemType | null>(null)
    const [selectedGoal, setSelectedGoal] =
        useState<NormalizedDropdownItemType | null>(null)

    const [dateTime, setDateTime] = useState<ZonedDateTime | null>(
        now('Europe/Oslo'),
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
                        selectedItem={selectedStart}
                        prepend={<MapPinIcon></MapPinIcon>}
                        onChange={setSelectedStart}
                    />
                    <SearchableDropdown
                        label="Mål"
                        items={fetchItems}
                        prepend={<DestinationIcon></DestinationIcon>}
                        selectedItem={selectedGoal}
                        onChange={setSelectedGoal}
                    />
                </div>
                <div className="space-y-10 mt-10">
                    <Heading3>Velg starttidspunkt</Heading3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <DatePicker
                            label="Dato"
                            selectedDate={dateTime}
                            onChange={setDateTime}
                            locale="nb-NO"
                            // 'forcedReturnType' er nødvendig når
                            // initiell state er 'null'
                            forcedReturnType="ZonedDateTime"
                        />
                        <TimePicker
                            label="Tid"
                            selectedTime={time}
                            locale="no-NB"
                            onChange={(time: ZonedDateTime | null) =>
                                setTime(time)
                            }
                        />
                    </div>
                    <Button width="auto" variant="primary" size="medium">
                        Opprett rute
                    </Button>
                </div>
            </div>
        </div>
    )
}
