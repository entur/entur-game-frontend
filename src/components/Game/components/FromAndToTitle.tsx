import React, { ReactElement } from 'react'
import { formatDate } from '@/lib/utils/dateFnsUtils'

import { Event } from '@/lib/types/types'
import { Heading4 } from '@entur/typography'

type Props = {
    className?: string
    event: Event
    startTime: Date
}

function FromAndToTitle({ className, event, startTime }: Props): ReactElement {
    return (
        <div>
            <div className={`flex xl:flex-row flex-wrap space-x-1 ${className}`}>
                <Heading4 margin="none">Du skal reise fra</Heading4>
                <Heading4 margin="none" className="text-coral">
                    {event.startLocation.name}
                </Heading4>
                <Heading4 margin="none">til</Heading4>
                <Heading4 margin="none" className="text-coral">
                    {event.endLocation[0].name}
                </Heading4>
            </div>
            <Heading4 margin="none">{formatDate(startTime)}</Heading4>
            <Heading4 margin="none">Hvordan vil du starte?</Heading4>
        </div>
    )
}

export default FromAndToTitle
