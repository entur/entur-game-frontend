'use client'

import React, { ReactElement } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { BlockquoteFooter } from '@entur/typography'
import { DatePicker, TimePicker } from '@entur/datepicker'
import { now, ZonedDateTime } from '@internationalized/date'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'

type TGeoresponse = {
    features: Array<{
        properties: {
            id?: string
            name?: string
        }
    }>
}

export default function AdminCreateJourney(): ReactElement {
    const fetchItems = React.useCallback(
        async (inputValue: string): Promise<NormalizedDropdownItemType[]> => {
            try {
                if (inputValue.length < 2) return []
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
        React.useState<NormalizedDropdownItemType | null>(null)
    const [selectedGoal, setSelectedGoal] =
        React.useState<NormalizedDropdownItemType | null>(null)

    const [date, setDate] = React.useState<ZonedDateTime | null>(
        now('Europe/Oslo'),
    )
    const [time, setTime] = React.useState<ZonedDateTime | null>(
        now('Europe/Oslo'),
    )

    return (
        <div className="max-w-md ml-56 p-4 ">
            <BlockquoteFooter>Opprett Rute</BlockquoteFooter>
            <Heading1>Opprett en ny rute</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>
                    Konfigurer ny rute ved å angi start, mål og starttidspunkt
                </LeadParagraph>
            </div>
            <div className="space-y-10 pt-6">
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
            <div className="space-y-10 pt-12">
                <Heading3>Velg starttidspunkt</Heading3>
                <div className="flex flex-row">
                    <div className="pr-10">
                        <DatePicker
                            label="Dato"
                            selectedDate={date}
                            onChange={setDate}
                            locale="nb-NO"
                        ></DatePicker>
                    </div>
                    <TimePicker
                        label="Tid"
                        selectedTime={time}
                        locale="no-NB"
                        onChange={setTime}
                    ></TimePicker>
                </div>
                <div className="pt-12">
                    <Button width="auto" variant="primary" size="medium">
                        Opprett rute
                    </Button>
                </div>
            </div>
        </div>
    )
}
