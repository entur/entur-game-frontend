import React from 'react'
import { WalkIcon } from '@entur/icons'
import { TravelLegProps, TravelTag } from '@entur/travel'
import { Departure } from '@entur/sdk'
import { Label, SubParagraph } from '@entur/typography'
import { TransportIconPicker } from '@/lib/utils/transportMapper'

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

    const transportMode =
        usedDeparture?.serviceJourney.journeyPattern?.line.transportMode

    const correctedTransportMode =
        transportMode === 'coach' ? 'bus' : transportMode

    return (
        <div className="[&>*]:w-full mr-2">
            <TravelTag
                transport={
                    (correctedTransportMode as TravelLegProps['transport']) ??
                    'foot'
                }
            >
                <TransportIconPicker transportType={correctedTransportMode} />
                <SubParagraph className="pt-0.5 pb-0">
                    {
                        usedDeparture?.serviceJourney.journeyPattern?.line
                            .publicCode
                    }
                </SubParagraph>
            </TravelTag>
        </div>
    )
}
