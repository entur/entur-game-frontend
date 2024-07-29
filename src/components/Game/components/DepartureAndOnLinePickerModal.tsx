import { useState, SetStateAction, Dispatch } from 'react'
import { Heading1, Heading2, SubParagraph } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { Departure, QueryMode } from '@entur/sdk'
import { Modal } from '@entur/modal'
import { getModeIcon } from '@/lib/utils/transportMapper'
import { formatTime } from '@/lib/utils/dateFnsUtils'
import { StopAndTime } from '@/components/Game/Game'
import { generateKey } from '@/lib/utils/generateUniqueKey'
import {
    DataCell,
    HeaderCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from '@entur/table'
import { SecondaryButton } from '@entur/button'
import { ForwardIcon } from '@entur/icons'

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
                size="medium"
            >
                {departures?.length ? (
                    <div className="bg-blue-90 p-4 rounded-lg">
                        <Heading1>{currentStopPlaceName}</Heading1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <HeaderCell>Linje</HeaderCell>
                                    <HeaderCell>Destinasjon</HeaderCell>
                                    <HeaderCell>Avreise</HeaderCell>
                                    <HeaderCell>Velg</HeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
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
                                        <TableRow
                                            key={
                                                departure.destinationDisplay
                                                    .frontText +
                                                departure.serviceJourney.id
                                            }
                                        >
                                            <DataCell>
                                                {mode
                                                    ? getModeIcon(mode)
                                                    : null}
                                            </DataCell>
                                            <DataCell>
                                                <SubParagraph>
                                                    {
                                                        departure.serviceJourney
                                                            .journeyPattern
                                                            ?.line.publicCode
                                                    }{' '}
                                                    {
                                                        departure
                                                            .destinationDisplay
                                                            .frontText
                                                    }
                                                </SubParagraph>
                                            </DataCell>
                                            <DataCell>
                                                <SubParagraph>
                                                    {formatTime(
                                                        departure.expectedDepartureTime,
                                                    )}
                                                </SubParagraph>
                                            </DataCell>
                                            <DataCell>
                                                <SecondaryButton
                                                    size="small"
                                                    onClick={() => {
                                                        selectDeparture(
                                                            departure,
                                                        )
                                                        setPickedDeparture(
                                                            departure,
                                                        )
                                                    }}
                                                >
                                                    <span className="flex items-center">
                                                        Velg
                                                        <ForwardIcon className="ml-2 mb-1.5 relative" />
                                                    </span>
                                                </SecondaryButton>
                                            </DataCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : null}
                <>
                    {departures?.length ? (
                        <>
                            <Heading2>Velg avgang</Heading2>
                            <ChoiceChipGroup
                                value="none"
                                onChange={() => {}}
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
