import React from 'react'
import {
    BusIcon,
    FerryIcon,
    MetroIcon,
    TrainIcon,
    TramIcon,
    WalkIcon,
} from '@entur/icons'
import { TravelLegProps, TravelTag } from '@entur/travel'
import { Departure } from '@entur/sdk'
import { Label } from '@entur/typography'

type Props = {
    usedDeparture: Departure | undefined
}

export function TravelLegTag({
    usedDeparture,
}: Props): React.ReactElement | null {
    if (usedDeparture === undefined) {
        return (
            <div className="flex flex-row content-center gap-4 mt-2">
                <WalkIcon color="grey" />
                <Label className="text-center" margin="none">
                    Gått 500 meter
                </Label>
            </div>
        )
    }
    return (
        <div className="w-20 [&>*]:w-full mr-2">
            <TravelTag
                transport={
                    (usedDeparture?.serviceJourney.journeyPattern?.line
                        .transportMode as TravelLegProps['transport']) ?? 'foot'
                }
            >
                <TransportIconPicker
                    transportType={
                        usedDeparture?.serviceJourney.journeyPattern?.line
                            .transportMode
                    }
                />
                {usedDeparture?.serviceJourney.journeyPattern?.line.publicCode}
            </TravelTag>
        </div>
    )
}

type TransportIconPickerProps = {
    transportType: string | undefined
}

function TransportIconPicker({
    transportType,
}: TransportIconPickerProps): JSX.Element {
    switch (transportType) {
        case 'bus':
            return <BusIcon color="white" />
        case 'tram':
            return <TramIcon color="white" />
        case 'metro':
            return <MetroIcon color="white" />
        case 'rail':
            return <TrainIcon color="white" />
        case 'water':
            return <FerryIcon color="white" />
        default:
            return <BusIcon color="white" />
    }
}
