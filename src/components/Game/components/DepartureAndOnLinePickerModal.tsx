import { useState, SetStateAction, Dispatch } from 'react'
import { Heading2 } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { Departure, QueryMode } from '@entur/sdk'
import { Modal } from '@entur/modal'
import { StopAndTime } from '@/components/Game/Game'
import { generateKey } from '@/lib/utils/generateUniqueKey'
import DepartureTable from './DepartureTable'

type Props = {
    departures: Departure[]
    stopsOnLine: StopAndTime[]
    mode: QueryMode | null
    isOpenModal: boolean
    currentStopPlaceName: string
    selectDeparture: (departure: Departure) => void
    selectStopOnLine: (stopAndTime: StopAndTime) => void
    setModalOpen: Dispatch<SetStateAction<boolean>>
    setUsedDepartures: Dispatch<SetStateAction<(Departure | undefined)[]>>
}

export const DepartureAndOnLinePickerModal = ({
    departures,
    stopsOnLine,
    mode,
    isOpenModal,
    currentStopPlaceName,
    selectDeparture,
    selectStopOnLine,
    setModalOpen,
    setUsedDepartures,
}: Props): JSX.Element => {
    const [pickedDeparture, setPickedDeparture] = useState<
        Departure | undefined
    >(undefined)
    return (
        <>
            <Modal
                open={isOpenModal}
                onDismiss={() => {
                    // Should probably reset usedDepartures here
                    setModalOpen(false)
                }}
                title=""
                size="extraLarge"
            >
                {departures?.length ? (
                    <DepartureTable
                        departures={departures}
                        mode={mode}
                        selectDeparture={selectDeparture}
                        setPickedDeparture={setPickedDeparture}
                        currentStopPlaceName={currentStopPlaceName}
                    />
                ) : null}
                {stopsOnLine?.length ? (
                    <>
                        <Heading2>
                            Hvor vil du gå {mode === 'foot' ? 'til' : 'av'}?
                        </Heading2>

                        <ChoiceChipGroup
                            value="none"
                            onChange={() => {}}
                            name="Stop on line"
                        >
                            {stopsOnLine.map((stop) => (
                                <ChoiceChip
                                    className="select-none"
                                    key={generateKey(String(stop.stopPlace.id))}
                                    value={stop.stopPlace.id}
                                    onClick={() => {
                                        selectStopOnLine(stop)
                                        setUsedDepartures((prev) => [
                                            ...prev,
                                            pickedDeparture as Departure,
                                        ])
                                        setPickedDeparture(undefined)
                                    }}
                                >
                                    {stop.stopPlace.name}
                                </ChoiceChip>
                            ))}
                        </ChoiceChipGroup>
                    </>
                ) : null}
            </Modal>
        </>
    )
}
