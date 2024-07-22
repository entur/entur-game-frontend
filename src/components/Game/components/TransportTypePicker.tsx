import React, { ReactElement } from 'react'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { SleepIcon } from '@entur/icons'
import { QueryMode } from '@entur/sdk'
import { Heading2, Heading4 } from '@entur/typography'
import { StopPlace } from '@/lib/types/types'
import { getModeIcon, getModeTranslation } from '@/lib/utils/transportMapper'
import { Loader } from '@entur/loader'
import { SmallAlertBox } from '@entur/alert'
import { FloatingButton } from '@entur/button'

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
    availableModesError: boolean
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
    availableModesError
}: Props): ReactElement {
    return (
        <div className="bg-blue-20 text-white border-2 border-blue-20 shadow-sm rounded-sm pl-10 pb-8 pr-10">
            <Heading2 className="text-white">
                Velg transportmåte fra{' '}
                <span className="text-coral">{stopPlace.name}</span>
            </Heading2>
            <Heading4 margin="none" className="text-white select-none">
                Klokken er:{' '}
                <span className="text-coral">
                    {currentTime.toLocaleTimeString('nb-NO', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </Heading4>
            {availableModesError ? (
                <div className="text-red-500">
                    <SmallAlertBox variant="negative" width="fit-content">
                        Beklager, vi kunne ikke finne noen reiseruter på dette stoppestedet! Vennligst start spillet på nytt.
                    </SmallAlertBox>
                </div>
            ) : availableModes.length < 1 ? (
                <Loader>Laster inn transportmidler...</Loader>
            ) : (
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
                                <div className="bg-blue-20 border-0 ml-1 mr-2 mt-3 w-38 h-10 rounded-3xl sm:text-lg select-none">
                                    <div className="bg-blue-20 border-0">
                                        <FloatingButton
                                            size="medium"
                                            className="bg-blue-80 text-blue-main hover:bg-white"
                                            aria-label={getModeTranslation(mode)}
                                            onClick={() => selectMode(mode)}
                                            disabled={disabled || isLoading}
                                        >
                                            {getModeIcon(mode)}
                                            {getModeTranslation(mode)}
                                        </FloatingButton>
                                    </div>
                                </div>
                            )
                        })}
                        {!firstMove && (
                            <div className="bg-blue-20 border-0 ml-1 mr-2 mt-3 w-38 h-10 rounded-3xl sm:text-lg select-none">
                                <div className="bg-blue-20 border-0">
                                    <FloatingButton
                                        size="medium"
                                        className="bg-blue-80 text-blue-main hover:bg-white"
                                        aria-label="Vent 6 timer"
                                        onClick={() => wait()}
                                        disabled={isLoading} //TODO: sjekk når sleep skal være disabled, og de andre også for den sagt skyld
                                    >
                                        <SleepIcon />
                                        Vent 6 timer
                                    </FloatingButton>
                                </div>
                            </div>
                        )}
                    </>
                </ChoiceChipGroup>
            )}
        </div>
    )
}

export default TransportTypePicker
