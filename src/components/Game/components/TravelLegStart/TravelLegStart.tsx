import React, { ReactElement } from 'react'
import { Departure, QueryMode, StopPlace } from '@entur/sdk'
import { TravelLeg, TravelLegProps } from '@entur/travel'
import { Heading5 } from '@entur/typography'
import { generateKey } from '../../../../utils/generateUniqueKey'
import { TravelLegTag } from './TravelLegTag'

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
    // Show only one travel leg if there is only one
    if (travelLegs.length === 1) {
        return (
            <div className="flex flex-row">
                <TravelLeg
                    className="mt-1 mr-6 sm:mr-8"
                    transport="foot"
                    direction="vertical"
                    showStop={false}
                    showLine={false}
                />
                <Heading5 margin="none">{travelLegs[0].name}</Heading5>
            </div>
        )
    }
    const travelLegsLength = travelLegs.length - 1
    return (
        <div className="grid grid-cols-1">
            {travelLegs.map((travelLeg, index): JSX.Element => {
                return travelLegsLength !== index ? (
                    <div
                        key={generateKey(travelLeg.id)}
                        className="flex flex-row"
                    >
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8 h-24"
                            transport={
                                travelLegsMode[
                                    index
                                ] as TravelLegProps['transport']
                            }
                            direction="vertical"
                            showStop={false}
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
                    // Last travel leg
                    <div
                        key={generateKey(travelLeg.id)}
                        className="flex flex-row"
                    >
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8"
                            transport={
                                travelLegsMode[
                                    index - 1
                                ] as TravelLegProps['transport']
                            }
                            direction="vertical"
                            showStop={false}
                            showLine={false}
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
