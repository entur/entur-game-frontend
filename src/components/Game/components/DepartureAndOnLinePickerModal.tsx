import React from 'react'
import { Heading2 } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { Departure, QueryMode } from '@entur/sdk'
import { Modal } from '@entur/modal'
import { getModeIcon } from '../../../utils/transportMapper'
import { formatTime } from '../../../utils/dateFnsUtils'
import { StopAndTime } from '../GameScreen'

type Props = {
    departures: Departure[]
    stopsOnLine: StopAndTime[]
    selectDeparture: (departure: Departure) => void
    mode: QueryMode | null
    selectStopOnLine: (stopAndTime: StopAndTime) => void
    isOpenModal: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DepartureAndOnLinePickerModal = ({
    departures,
    stopsOnLine,
    selectDeparture,
    mode,
    selectStopOnLine,
    isOpenModal,
    setModalOpen,
}: Props): JSX.Element => {
    return (
        <>
            <Modal
                open={isOpenModal}
                onDismiss={() => setModalOpen(false)}
                title=""
                size="medium"
            >
                <>
                    {departures?.length ? (
                        <div>
                            <Heading2>Velg avgang</Heading2>
                            <ChoiceChipGroup
                                value="none"
                                onChange={console.log}
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
                                            onClick={() =>
                                                selectDeparture(departure)
                                            }
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
                        </div>
                    ) : null}
                </>
                {stopsOnLine?.length ? (
                    <div>
                        <Heading2>
                            Hvor vil du gå {mode === 'foot' ? 'til' : 'av'}?
                        </Heading2>

                        <ChoiceChipGroup
                            value="none"
                            onChange={console.log}
                            name="Stop on line"
                        >
                            {stopsOnLine.map((stop) => (
                                <ChoiceChip
                                    className="select-none"
                                    key={stop.stopPlace.id}
                                    value={stop.stopPlace.id}
                                    onClick={() => selectStopOnLine(stop)}
                                >
                                    {stop.stopPlace.name}
                                </ChoiceChip>
                            )).slice(1)}
                        </ChoiceChipGroup>
                    </div>
                ) : null}
            </Modal>
        </>
    )
}
