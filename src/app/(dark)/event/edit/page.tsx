'use client'

import { useState } from 'react'
import { Heading3 } from '@entur/typography'

import { Contrast } from '@entur/layout'

import { Dropdown, NormalizedDropdownItemType } from '@entur/dropdown'
import useSWR, { mutate } from 'swr'
import {
    updateActiveGameModeEvent,
} from '@/lib/api/gameModeApi'
import { Loader } from '@entur/loader'
import { PrimaryButton } from '@entur/button'
import { getActiveEvent, getAllEvents } from '@/lib/api/eventApi'

export default function EventEditPage(): JSX.Element {
    const { data: events } = useSWR('/game-mode', () => getAllEvents())
    const { data: activeEvent } = useSWR('/game-mode/active-event', () =>
        getActiveEvent(),
    )

    //TODO: kanskje legge til fra til og ikke bare navnet på eventet
    //TODO: siste gameMode-funksjonen må byttes ut
    const [selectedItem, setSelectedItem] =
        useState<NormalizedDropdownItemType | null>(
            activeEvent
                ? {
                      label:
                          activeEvent.eventName,
                      value: activeEvent.eventName,
                  }
                : null,
        )

    if (events === undefined || events === null || activeEvent === undefined) {
        return <Loader>Laster inn...</Loader>
    }

    const items = events.map((gameMode) => {
        return {
            label: gameMode.eventName,
            value: gameMode.eventName,
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
                            await updateActiveGameModeEvent(selectedItem.value)
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
