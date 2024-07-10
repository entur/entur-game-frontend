'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { BlockquoteFooter } from '@entur/typography'
import { DatePicker, TimePicker, ZonedDateTime } from '@entur/datepicker'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'
import { GetTripInfoQueryVariables } from '@/gql/graphql'
import { now } from '@internationalized/date'
import { BackendEvent } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { useToast } from '@entur/alert'
import { createNewEvent } from '@/lib/api/eventApi'

type TGeoresponse = {
    features: Array<{
        properties: {
            id?: string
            name?: string
        }
    }>
}

const query = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime) {
    tripPatterns {
      duration
      legs {
        fromPlace {
          name
        }
        toPlace {
          name
        }
      }
    }
  }
}
`

function pad(number: number, length: number): string {
    return number.toString().padStart(length, '0')
}

function formatDateTime(
    dateObj: ZonedDateTime,
    timeObj: ZonedDateTime,
): string {
    const year = dateObj.year
    const month = pad(dateObj.month, 2)
    const day = pad(dateObj.day, 2)

    const hour = pad(timeObj.hour, 2)
    const minute = pad(timeObj.minute, 2)
    const second = pad(timeObj.second, 2)

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`

    return formattedDate
}

export default function AdminCreateJourney() {
    const router = useRouter()
    const { addToast } = useToast()
    const [attemptedSubmit, setAttemptedSubmit] = useState(false)
    const [selectedStart, setSelectedStart] =
        useState<NormalizedDropdownItemType | null>(null)
    const [selectedGoal, setSelectedGoal] =
        useState<NormalizedDropdownItemType | null>(null)
    const [date, setDate] = useState<ZonedDateTime | null>(now('Europe/Oslo'))
    const [time, setTime] = useState<ZonedDateTime | null>(now('Europe/Oslo'))

    const formattedDateTime = date && time ? formatDateTime(date, time) : ''

    const [event, setEvent] = useState<BackendEvent>()

    useEffect(() => {
        if (event) {
            createNewEvent(event)
            router.push(`/admin`)
            addToast({
                title: 'Ny rute opprettet!',
                content: <>Ruten kan spilles av alle med lenken</>,
            })
        }
    }, [event, router, addToast])


    const fetchTripInfo = useCallback(async () => {
        if (!selectedStart?.label || !selectedGoal?.label) {
            console.error('Error: selectedStart.label is required')
            return
        }

        const variables: GetTripInfoQueryVariables = {
            from: {
                name: selectedStart?.label,
                place: selectedStart?.value,
            },
            to: {
                name: selectedGoal?.label,
                place: selectedGoal?.value,
            },
            dateTime: formattedDateTime,
        }

        const eventName = `${selectedStart?.label} - ${selectedGoal?.label}`

        fetch('https://api.entur.io/journey-planner/v3/graphql', {
            method: 'POST',
            headers: {
                'ET-Client-Name': 'enturspillet',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })
            .then((res) => res.json())
            .then((getTripInfo) => {
                if (getTripInfo.data?.trip?.tripPatterns?.length > 0) {
                    const tripPattern = getTripInfo.data.trip.tripPatterns[0]

                    const newEvent: BackendEvent = {
                        eventName: eventName,
                        startLocationId: selectedStart?.value,
                        endLocationId: selectedGoal?.value,
                        startTime: formattedDateTime,
                        optimalStepNumber: tripPattern.legs.length,
                        optimalTravelTime: tripPattern.duration,
                        isActive: true,
                    }
                    setEvent(newEvent)
                }
            })
            .catch((error) => console.error('Error fetching trip info:', error))
    }, [selectedStart, selectedGoal, formattedDateTime])

    const handleOnClick = () => {
        if (!selectedStart || !selectedGoal || !selectedStart.label) {
            setAttemptedSubmit(true)
            console.error(
                'Error: selectedStart.label is required for submission',
            )
            return
        }

        fetchTripInfo()

        if (event) {
            createNewEvent(event)
            router.push(`/admin`)
            addToast({
                title: 'Ny rute opprettet!',
                content: <>Ruten kan spilles av alle med lenken</>,
            })
        }
    }

    const fetchItems = useCallback(
        async (inputValue: string): Promise<NormalizedDropdownItemType[]> => {
            try {
                if (inputValue.length < 2) return []
                const response = await fetch(
                    `https://api.entur.io/geocoder/v1/autocomplete?text=${inputValue}&size=5&lang=no&layer=venue`,
                )
                const data: TGeoresponse = await response.json()
                const mappedData = data.features.map((feature) => {
                    const { id, name } = feature.properties || {}
                    return {
                        label: name ?? '',
                        value: id ?? '',
                    }
                })
                return mappedData
            } catch (error) {
                if (error === 'AbortError') throw error
                console.error('Error fetching data:', error)
                return []
            }
        },
        [],
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
                    selectOnTab
                    variant={
                        attemptedSubmit && !selectedStart
                            ? 'negative'
                            : undefined
                    }
                    feedback={
                        attemptedSubmit && !selectedStart
                            ? 'Du må velge startsted'
                            : undefined
                    }
                />
                <SearchableDropdown
                    label="Mål"
                    items={fetchItems}
                    prepend={<DestinationIcon></DestinationIcon>}
                    selectedItem={selectedGoal}
                    onChange={setSelectedGoal}
                    selectOnTab
                    variant={
                        attemptedSubmit && !selectedGoal
                            ? 'negative'
                            : undefined
                    }
                    feedback={
                        attemptedSubmit && !selectedGoal
                            ? 'Du må velge endestopp'
                            : undefined
                    }
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
                    <Button
                        width="auto"
                        variant="primary"
                        size="medium"
                        onClick={() => handleOnClick()}
                    >
                        Opprett rute
                    </Button>
                </div>
            </div>
        </div>
    )
}
