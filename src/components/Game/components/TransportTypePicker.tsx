import React, { ReactElement } from 'react'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { SleepIcon } from '@entur/icons'
import { QueryMode } from '@entur/sdk'
import { Heading2, Heading4 } from '@entur/typography'
import { StopPlace } from '@/lib/types/types'
import { getModeIcon, getModeTranslation } from '@/lib/utils/transportMapper'

type Props = {
    currentTime: Date
    isLoading: boolean
    mode: QueryMode | null
    usedMode: QueryMode[]
    selectMode: (mode: QueryMode) => void
    wait: () => void
    stopPlace: StopPlace
    firstMove: boolean
    availableModes: QueryMode[]
}

function TransportTypePicker({
    currentTime,
    isLoading,
    mode,
    usedMode,
    selectMode,
    wait,
    stopPlace,
    firstMove,
    availableModes,
}: Props): ReactElement {
    return (
        <div className="bg-white border-4 border-white shadow-sm rounded-sm pl-10 pb-8 pr-10">
            <Heading2>
                Velg transportmåte fra{' '}
                <span className="text-coral">{stopPlace.name}</span>
            </Heading2>
            <Heading4 margin="none" className="select-none">
                Klokken er:{' '}
                <span className="text-coral">
                    {currentTime.toLocaleTimeString('nb-NO', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </Heading4>
            <ChoiceChipGroup
                value={mode ?? 'none'}
                onChange={() => {
                    /* Do nothing */
                }}
                name="Transport mode"
            >
                <>
                    {availableModes.map((mode) => {
                        const disabled = usedMode.includes(mode)
                        return (
                            <ChoiceChip
                                className="border-2 ml-1 mr-2 mt-3 w-38 h-10 rounded-3xl sm:text-lg select-none"
                                key={mode}
                                value={mode}
                                onClick={() => selectMode(mode)}
                                disabled={disabled || isLoading}
                            >
                                {getModeIcon(mode)}
                                {getModeTranslation(mode)}
                            </ChoiceChip>
                        )
                    })}
                    {!firstMove && (
                        <ChoiceChip
                            className="border-2 ml-1 mr-2 mt-3 w-38 h-10 rounded-3xl sm:text-lg select-none"
                            key="wait"
                            value="wait"
                            onClick={() => wait()}
                            disabled={isLoading}
                        >
                            <SleepIcon />
                            Vent 6 timer
                        </ChoiceChip>
                    )}
                </>
            </ChoiceChipGroup>
        </div>
    )
}

export default TransportTypePicker
