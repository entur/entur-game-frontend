import React, { ReactElement } from 'react'
import { StopPlace } from '@entur/sdk'
import { TravelLeg } from '@entur/travel'
import { Heading4 } from '@entur/typography'

type Props = {
    targets: StopPlace[]
}

export function TravelLegFinished({ targets }: Props): ReactElement {
    return (
        <>
            <div className="flex flex-row">
                <TravelLeg
                    className="mt-1 mb-2 mr-6 sm:mr-8 h-24 [&>*]:bg-blue-40"
                    transport="foot"
                    direction="vertical"
                    showStart={false}
                />
                <Heading4 className="place-self-end" margin="none">
                    {targets[0].name}
                </Heading4>
            </div>
        </>
    )
}
