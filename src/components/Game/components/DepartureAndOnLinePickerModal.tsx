import { useState, SetStateAction, Dispatch } from 'react'
import { Heading2 } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { Departure, QueryMode } from '@entur/sdk'
import { Modal } from '@entur/modal'
import { getModeIcon } from '@/lib/utils/transportMapper'
import { formatTime } from '@/lib/utils/dateFnsUtils'
import { StopAndTime } from '../GameScreen'

type Props = {
    departures: Departure[]
    stopsOnLine: StopAndTime[]
    selectDeparture: (departure: Departure) => void
    mode: QueryMode | null
    selectStopOnLine: (stopAndTime: StopAndTime) => void
    isOpenModal: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>
    setUsedDepartures: Dispatch<SetStateAction<(Departure | undefined)[]>>
}

export const DepartureAndOnLinePickerModal = ({
    departures,
    stopsOnLine,
    selectDeparture,
    mode,
    selectStopOnLine,
    isOpenModal,
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
                size="medium"
            >
                <>
                    {departures?.length ? (
                        <>
                            <Heading2>Velg avgang</Heading2>
                            <ChoiceChipGroup
                                value="none"
                                onChange={() => { }}
                                name="Departure"
                            >
                                {departures
                                    .filter(
                                        (d, index, arr) =>
                                            arr.findIndex(
                                                (e) =>
                                                    e.destinationDisplay
                                                        .frontText ===
                                                    d.destinationDisplay
                                                        .frontText,
                                            ) === index,
                                    )
                                    .map((departure) => (
                                        <ChoiceChip
                                            className="select-none"
                                            key={
                                                departure.destinationDisplay
                                                    .frontText +
                                                departure.serviceJourney.id
                                            }
                                            value={
                                                departure.destinationDisplay
                                                    .frontText +
                                                departure.serviceJourney.id
                                            }
                                            onClick={() => {
                                                selectDeparture(departure)
                                                setPickedDeparture(departure)
                                            }}
                                        >
                                            {mode ? getModeIcon(mode) : null}
                                            {
                                                departure.serviceJourney
                                                    .journeyPattern?.line
                                                    .publicCode
                                            }{' '}
                                            {
                                                departure.destinationDisplay
                                                    .frontText
                                            }{' '}
                                            kl.{' '}
                                            {formatTime(
                                                departure.expectedDepartureTime,
                                            )}
                                        </ChoiceChip>
                                    ))}
                            </ChoiceChipGroup>
                        </>
                    ) : null}
                </>
                {stopsOnLine?.length ? (
                    <>
                        <Heading2>
                            Hvor vil du gå {mode === 'foot' ? 'til' : 'av'}?
                        </Heading2>

                        <ChoiceChipGroup
                            value="none"
                            onChange={() => { }}
                            name="Stop on line"
                        >
                            {stopsOnLine.map((stop) => (
                                <ChoiceChip
                                    className="select-none"
                                    key={stop.stopPlace.id}
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
