'use client'

import { useState } from 'react'
import { Heading3 } from '@entur/typography'

import { Contrast } from '@entur/layout'

import { Dropdown, NormalizedDropdownItemType } from '@entur/dropdown'
import useSWR, { mutate } from 'swr'
import { Loader } from '@entur/loader'
import { PrimaryButton } from '@entur/button'
import { getActiveEvent, getAllEvents, updateActiveEvent } from '@/lib/api/eventApi'

export default function EventEditPage(): JSX.Element {
    const { data: events } = useSWR('/event/all', () => getAllEvents())
    const { data: activeEvent } = useSWR('/event/active', () =>
        getActiveEvent(),
    )

    //TODO: kanskje legge til "fra - til" og ikke bare navnet på eventet
    //TODO: siste gameMode-funksjonen må byttes ut
    //TODO: kanskje se litt mer på formatering, aka toString og så Number() er rart og stygt
    const [selectedItem, setSelectedItem] =
        useState<NormalizedDropdownItemType | null>(
            activeEvent
                ? {
                    label:
                        activeEvent.eventName,
                    value: activeEvent.eventId.toString(),
                }
                : null,
        )

    if (events === undefined || events === null || activeEvent === undefined) {
        return <Loader>Laster inn...</Loader>
    }

    const items = events.map((event) => {
        return {
            label: event.eventName,
            value: event.eventId.toString(),
        }
    })
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <Contrast>
                <div className="w-64 mb-44">
                    <Heading3>
                        Aktiv event:{' '}
                        <span className="text-coral">
                            {activeEvent
                                ? `${activeEvent.eventName}`
                                : 'INGEN'}
                        </span>
                    </Heading3>
                </div>
                <div className="w-64 mb-20">
                    <Dropdown
                        label="Velg ny event"
                        selectedItem={selectedItem}
                        items={items}
                        onChange={(item) => {
                            if (item !== null) {
                                setSelectedItem(item)
                            }
                        }}
                    />
                </div>
                <PrimaryButton
                    disabled={selectedItem === null}
                    onClick={async () => {
                        if (selectedItem !== null) {
                            await updateActiveEvent(Number(selectedItem.value))
                            await mutate('/game-mode/active-event')
                        }
                    }}
                >
                    Oppdater event
                </PrimaryButton>
            </Contrast>
        </div>
    )
}
