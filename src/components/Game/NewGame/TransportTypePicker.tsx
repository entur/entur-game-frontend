import React, { ReactElement } from 'react'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { SleepIcon } from '@entur/icons'
import { QueryMode, StopPlace } from '@entur/sdk'
import { Heading2 } from '@entur/typography'

import { getModeIcon, getModeTranslation } from '../../../utils/transportMapper'
import { ALL_MODES } from '../../../constant/queryMode'

type Props = {
    mode: QueryMode | null
    usedMode: QueryMode[]
    selectMode: (mode: QueryMode) => void
    wait: () => void
    stopPlace: StopPlace
}

function TransportTypePicker({
    mode,
    usedMode,
    selectMode,
    wait,
    stopPlace,
}: Props): ReactElement {
    return (
        <div className="bg-white border-2 rounded-md pl-10 pb-8 ml-5">
            <Heading2>
                Velg transportmåte fra{' '}
                <span className="text-coral">{stopPlace.name}</span>
            </Heading2>
            <ChoiceChipGroup
                value={mode || 'none'}
                onChange={console.log}
                name="Transport mode"
            >
                <>
                    {ALL_MODES.map((mode) => {
                        const disabled = usedMode.includes(mode)
                        return (
                            <>
                                <ChoiceChip
                                    className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                                    key={mode}
                                    value={mode}
                                    onClick={() => selectMode(mode)}
                                    disabled={disabled}
                                >
                                    {getModeIcon(mode)}
                                    {getModeTranslation(mode)}
                                </ChoiceChip>
                            </>
                        )
                    })}
                    <ChoiceChip
                        className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                        key="wait"
                        value="wait"
                        onClick={() => wait()}
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
