import React from 'react'
import { Departure, QueryMode } from '@entur/sdk'
import { Heading1, SubParagraph } from '@entur/typography'
import { TransportIconPicker } from '@/lib/utils/transportMapper'
import { formatTime } from '@/lib/utils/dateFnsUtils'
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
import { TravelTag } from '@entur/travel'

type DepartureTableProps = {
    departures: Departure[]
    mode: QueryMode | null
    selectDeparture: (departure: Departure) => void
    setPickedDeparture: (departure: Departure) => void
    currentStopPlaceName: string
}

const DepartureTable = ({
    departures,
    mode,
    selectDeparture,
    setPickedDeparture,
    currentStopPlaceName,
}: DepartureTableProps): JSX.Element => (
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
                                    e.destinationDisplay.frontText ===
                                    d.destinationDisplay.frontText,
                            ) === index,
                    )
                    .map((departure) => (
                        <TableRow
                            key={
                                departure.destinationDisplay.frontText +
                                departure.serviceJourney.id
                            }
                        >
                            <DataCell>
                                <TravelTag alert="none" transport="bus">
                                    <TransportIconPicker
                                        transportType={mode ?? 'bus'}
                                    />
                                    <SubParagraph className="pt-0.5 pb-0 text-white">
                                        {
                                            departure.serviceJourney
                                                .journeyPattern?.line.publicCode
                                        }
                                    </SubParagraph>
                                </TravelTag>
                            </DataCell>
                            <DataCell>
                                <SubParagraph>
                                    {departure.destinationDisplay.frontText}
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
                                        selectDeparture(departure)
                                        setPickedDeparture(departure)
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
)

export default DepartureTable
