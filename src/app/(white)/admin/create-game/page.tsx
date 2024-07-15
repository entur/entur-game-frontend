'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@entur/button'
import { Heading1, Heading3, LeadParagraph, Paragraph } from '@entur/typography'
import { MapPinIcon, DestinationIcon } from '@entur/icons'
import { BlockquoteFooter } from '@entur/typography'
import { DatePicker, TimePicker, ZonedDateTime } from '@entur/datepicker'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'
import { now } from '@internationalized/date'
import { BackendEvent, TGeoresponse } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { useToast } from '@entur/alert'
import { createEvent } from '@/lib/api/eventApi'

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
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (event) {
            createEvent(event)
            router.push(`/admin`)
            addToast({
                title: 'Nytt spill opprettet!',
                content: <>Ruten kan spilles av alle med lenken</>,
            })
        }
    }, [event, router, addToast])

    const fetchTripInfo = useCallback(async () => {
        if (!selectedStart?.label || !selectedGoal?.label) {
            return
        }
        setLoading(true)

        const variables = {
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
            .finally(() => setLoading(false))
    }, [selectedStart, selectedGoal, formattedDateTime])

    const handleOnClick = () => {
        if (!selectedStart || !selectedGoal || !selectedStart.label) {
            setAttemptedSubmit(true)
            return
        }

        fetchTripInfo()
    }

    const fetchItems = useCallback(
        async (inputValue: string): Promise<NormalizedDropdownItemType[]> => {
            try {
                if (inputValue.length < 2) return []
                const response = await fetch(
                    `https://api.entur.io/geocoder/v1/autocomplete?text=${inputValue}&size=8&lang=no&layer=venue`,
                )
                const data: TGeoresponse = await response.json()
                const mappedData = data.features.map((feature) => {
                    const { id, label } = feature.properties || {}
                    return {
                        label: label ?? '',
                        value: id ?? '',
                    }
                })
                const filteredData = mappedData.filter(
                    (item) => !/^NSR:GroupOfStopPlaces:\d+$/.test(item.value),
                )
                return filteredData
            } catch (error) {
                if (error === 'AbortError') throw error
                console.error('Error fetching data:', error)
                return []
            }
        },
        [],
    )

    return (
        <div className="ml-56 p-4 ">
            <div className="flex flex-col">
                <BlockquoteFooter>Opprett Spill</BlockquoteFooter>
                <Heading1 margin="none">Opprett et nytt spill</Heading1>
                <LeadParagraph margin="bottom">
                    Konfigurer ny rute ved å angi start, mål og starttidspunkt
                </LeadParagraph>
            </div>
            <div className="flex flex-col pt-6">
                <Heading3>Velg start og mål</Heading3>
                <Paragraph margin="bottom">
                    Velg hvilke to stoppested ruten til dette spillet skal gå
                    mellom
                </Paragraph>
                <div className="max-w-md space-y-8">
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
            </div>
            <div className="flex flex-col pt-12">
                <Heading3>Velg starttidspunkt</Heading3>
                <Paragraph margin="bottom">
                    Velg hvilken dag og hvilket tidspunkt spillets reiserute
                    skal starte på
                </Paragraph>
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
                <div className="pt-12 pb-12">
                    <Button
                        width="auto"
                        variant="primary"
                        size="medium"
                        onClick={handleOnClick}
                        loading={loading}
                    >
                        Opprett spill
                    </Button>
                </div>
            </div>
        </div>
    )
}
