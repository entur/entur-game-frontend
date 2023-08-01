import React, { ReactElement } from 'react'
import { QueryMode, StopPlace } from '@entur/sdk'
import { TravelLeg, TravelLegProps } from '@entur/travel'
import { Heading4 } from '@entur/typography'

type Props = {
    travelLegs: StopPlace[]
    travelLegsMode: QueryMode[]
}
// TODO: Add transport line to TravelLeg
function TravelLegStart({ travelLegs, travelLegsMode }: Props): ReactElement {
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
                <Heading4 margin="none">{travelLegs[0].name}</Heading4>
            </div>
        )
    }
    const travelLegsLength = travelLegs.length - 1
    return (
        <div className="grid grid-cols-1">
            {travelLegs.map((travelLeg, index): JSX.Element => {
                return travelLegsLength !== index ? (
                    <div className="flex flex-row">
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8 h-24"
                            transport={
                                travelLegsMode[
                                    index + 1
                                ] as TravelLegProps['transport']
                            }
                            direction="vertical"
                            showStop={false}
                        />
                        <Heading4 margin="none">
                            {travelLegs[index].name}
                        </Heading4>
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <TravelLeg
                            className="mt-1 mr-6 sm:mr-8"
                            transport={
                                travelLegsMode[
                                    index + 1
                                ] as TravelLegProps['transport']
                            }
                            direction="vertical"
                            showStop={false}
                            showLine={false}
                        />
                        <Heading4 margin="none">
                            {travelLegs[index].name}
                        </Heading4>
                    </div>
                )
            })}
        </div>
    )
}

export default TravelLegStart
