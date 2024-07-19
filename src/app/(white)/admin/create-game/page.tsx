'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, ButtonGroup, SecondaryButton } from '@entur/button'
import {
    Heading1,
    Heading3,
    LeadParagraph,
    Paragraph,
    SmallText,
} from '@entur/typography'
import {
    MapPinIcon,
    DestinationIcon,
    ValidationInfoFilledIcon,
    BackArrowIcon,
} from '@entur/icons'
import { BlockquoteFooter } from '@entur/typography'
import { DatePicker, TimePicker, ZonedDateTime } from '@entur/datepicker'
import { NormalizedDropdownItemType, SearchableDropdown } from '@entur/dropdown'
import { now } from '@internationalized/date'
import { BackendEvent, isTripInfoVariables } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { useToast } from '@entur/alert'
import { createEvent } from '@/lib/api/eventApi'
import { formatDateTime } from '@/lib/utils/dateFnsUtils'
import { getTripInfo, fetchDropdownItems } from '@/lib/api/journeyPlannerApi'
import { tripQuery, visualSolutionTripQuery } from '@/lib/constants/queries'
import useSWR from 'swr'
import RouteSuggestion from '@/components/RouteSuggestion'

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
            modes: [
                { transportMode: 'bus' },
                { transportMode: 'tram' },
                { transportMode: 'rail' },
                { transportMode: 'metro' },
                { transportMode: 'water' },
            ],
        }

        const eventName = `${selectedStart?.label} - ${selectedGoal?.label}`

        getTripInfo(tripQuery, variables)
            .then((trip) => {
                if (trip.data?.trip?.tripPatterns?.length > 0) {
                    const tripPattern = trip.data.trip.tripPatterns[0]

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
        modes: [
            { transportMode: 'bus' },
            { transportMode: 'tram' },
            { transportMode: 'rail' },
            { transportMode: 'metro' },
            { transportMode: 'water' },
        ],
    }

    const { data, isLoading, error } = useSWR(
        selectedStart && selectedGoal && formattedDateTime
            ? [
                  '/journey-planner',
                  selectedStart,
                  selectedGoal,
                  formattedDateTime,
              ]
            : null,
        () =>
            isTripInfoVariables(variables) &&
            getTripInfo(visualSolutionTripQuery, variables),
    )

    const handleBackClick = () => {
        router.push(`/admin`)
    }

    return (
        <div className="ml-56 p-4 pt-20">
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
                        items={fetchDropdownItems}
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
                        items={fetchDropdownItems}
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
                <div className="flex gap-2 pt-2">
                    <ValidationInfoFilledIcon></ValidationInfoFilledIcon>
                    <SmallText>
                        Spillet kan ikke ha starttidspunkt mer enn tre dager før
                        dagens dato
                    </SmallText>
                </div>
                <RouteSuggestion
                    suggestedTripData={data?.data?.trip}
                    startLocationName={selectedStart?.label}
                    isLoading={isLoading}
                    error={error}
                />
                <ButtonGroup className="flex mt-20">
                    <SecondaryButton
                        onClick={handleBackClick}
                        className="flex items-center min-w-20"
                    >
                        <div className="h-full pt-2.5">
                            <BackArrowIcon />
                        </div>
                        Tilbake
                    </SecondaryButton>
                    <Button
                        width="auto"
                        variant="primary"
                        size="medium"
                        onClick={handleOnClick}
                        loading={loading}
                    >
                        Opprett spill
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
