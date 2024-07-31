import React, { ReactElement } from 'react'
import { StopPlace } from '@entur/sdk'
import { TravelLeg } from '@entur/travel'
import { Heading4 } from '@entur/typography'

type Props = {
    endLocation: StopPlace[]
}

export function TravelLegFinished({ endLocation }: Props): ReactElement {
    return (
        <>
            <div className="flex flex-row">
                <TravelLeg
                    className="mb-2 mr-6 sm:mr-8 h-24 [&>*]:bg-blue-40"
                    transport="foot"
                    direction="vertical"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    showStart={false}
                />
                <Heading4 className="place-self-end" margin="none">
                    {endLocation[0].name}
                </Heading4>
            </div>
        </>
    )
}
