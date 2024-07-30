import React, { ReactElement } from 'react'
import { Departure, QueryMode } from '@entur/sdk'
import { TravelLeg, TravelLegProps } from '@entur/travel'
import { Heading4, Heading5 } from '@entur/typography'
import { generateKey } from '@/lib/utils/generateUniqueKey'
import { TravelLegTag } from './TravelLegTag'
import { StopPlace } from '@/lib/types/types'

type Props = {
    travelLegs: StopPlace[]
    travelLegsMode: QueryMode[]
    usedDepartures: (Departure | undefined)[]
}

function TravelLegStart({
    travelLegs,
    travelLegsMode,
    usedDepartures,
}: Props): ReactElement {
    if (travelLegs.length === 1) {
        return (
            <div className="flex flex-row">
                <TravelLeg
                    className="mt-1 mr-6 sm:mr-8"
                    transport="foot"
                    direction="vertical"
                />
                <Heading4 margin="none">{travelLegs[0].name}</Heading4>
            </div>
        )
    }
    const travelLegsLength = travelLegs.length - 1

    return (
        <div className="grid grid-cols-1">
            {travelLegs.map((travelLeg, index): JSX.Element => {
                const transportMode = travelLegsMode[index]
                const correctedTransportMode =
                    transportMode === 'coach' ? 'bus' : transportMode

                return travelLegsLength !== index ? (
                    <div
                        key={generateKey(travelLeg.id)}
                        className="flex flex-row"
                    >
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8 h-24"
                            transport={
                                correctedTransportMode as TravelLegProps['transport']
                            }
                            direction="vertical"
                        />
                        <div className="flex flex-col">
                            <Heading5 margin="none">
                                {travelLegs[index].name}
                            </Heading5>
                            <div className="flex flex-row mt-4">
                                <TravelLegTag
                                    usedDeparture={usedDepartures[index + 1]}
                                />
                                <Heading5
                                    className="ml-3 place-self-center"
                                    margin="none"
                                >
                                    {
                                        usedDepartures[index + 1]
                                            ?.destinationDisplay.frontText
                                    }
                                </Heading5>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        key={generateKey(travelLeg.id)}
                        className="flex flex-row"
                    >
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8"
                            transport={
                                correctedTransportMode as TravelLegProps['transport']
                            }
                            direction="vertical"
                        />
                        <Heading5 margin="none">
                            {travelLegs[index].name}
                        </Heading5>
                    </div>
                )
            })}
        </div>
    )
}

export default TravelLegStart
