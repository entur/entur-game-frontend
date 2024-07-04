'use client'

import { useState } from 'react'
import { Heading3 } from '@entur/typography'

import { Contrast } from '@entur/layout'

import { Dropdown, NormalizedDropdownItemType } from '@entur/dropdown'
import useSWR, { mutate } from 'swr'
import {
    getActiveGameModeEvent,
    getAllGameMode,
    updateActiveGameModeEvent,
} from '@/lib/api/gameModeApi'
import { Loader } from '@entur/loader'
import { PrimaryButton } from '@entur/button'

export default function EventEditPage(): JSX.Element {
    const { data: gameModes } = useSWR('/game-mode', () => getAllGameMode())
    const { data: activeGameMode } = useSWR('/game-mode/active-event', () =>
        getActiveGameModeEvent(),
    )
    const [selectedItem, setSelectedItem] =
        useState<NormalizedDropdownItemType | null>(
            activeGameMode
                ? {
                      label:
                          activeGameMode.name +
                          ` (${activeGameMode.difficulty})`,
                      value: activeGameMode.difficulty,
                  }
                : null,
        )

    if (gameModes === undefined || activeGameMode === undefined) {
        return <Loader>Laster inn...</Loader>
    }

    const items = gameModes.map((gameMode) => {
        return {
            label: gameMode.name + ` (${gameMode.difficulty})`,
            value: gameMode.difficulty,
        }
    })
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <Contrast>
                <div className="w-64 mb-44">
                    <Heading3>
                        Aktiv event:{' '}
                        <span className="text-coral">
                            {activeGameMode
                                ? `${activeGameMode.name} (${activeGameMode.difficulty})`
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
