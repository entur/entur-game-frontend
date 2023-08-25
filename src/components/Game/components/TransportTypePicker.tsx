import React, { ReactElement } from 'react'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { SleepIcon } from '@entur/icons'
import { QueryMode, StopPlace } from '@entur/sdk'
import { Heading2 } from '@entur/typography'

import { getModeIcon, getModeTranslation } from '../../../utils/transportMapper'
import { ALL_MODES } from '../../../constant/queryMode'
import { Loader } from '@entur/loader'

type Props = {
    isLoading: boolean
    mode: QueryMode | null
    usedMode: QueryMode[]
    selectMode: (mode: QueryMode) => void
    wait: () => void
    stopPlace: StopPlace
}

function TransportTypePicker({
    isLoading,
    mode,
    usedMode,
    selectMode,
    wait,
    stopPlace,
}: Props): ReactElement {
    return (
        <div className="bg-white border-4 border-white shadow-sm rounded-sm pl-10 pb-8 pr-10">
            <Heading2>
                Velg transportmåte fra{' '}
                <span className="text-coral">{stopPlace.name}</span>
            </Heading2>
            <ChoiceChipGroup
                value={mode || 'none'}
                onChange={() => {
                    /* Do nothing */
                }}
                name="Transport mode"
            >
                <>
                    {ALL_MODES.map((mode) => {
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
                </>
            </ChoiceChipGroup>
        </div>
    )
}

export default TransportTypePicker
