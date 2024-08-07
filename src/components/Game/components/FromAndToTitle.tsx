import React, { ReactElement } from 'react'
import { formatDate } from '@/lib/utils/dateFnsUtils'

import { Event } from '@/lib/types/types'
import { Heading2, Heading3 } from '@entur/typography'

type Props = {
    event: Event
    startTime: Date
}

function FromAndToTitle({ event, startTime }: Props): ReactElement {
    return (
        <div>
            <div className={'flex xl:flex-row flex-wrap space-x-1 mt-5'}>
                <Heading2 margin="none">Du skal reise fra</Heading2>
                <Heading2 margin="none" className="text-coral">
                    {event.startLocation.name}
                </Heading2>
                <Heading2 margin="none">til</Heading2>
                <Heading2 margin="none" className="text-coral">
                    {event.endLocation[0].name}
                </Heading2>
            </div>
            <Heading3 margin="none">{formatDate(startTime)}</Heading3>
        </div>
    )
}

export default FromAndToTitle
