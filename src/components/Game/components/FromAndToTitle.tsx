import React, { ReactElement } from 'react'

import { Event } from '@/types/types'
import { Heading4 } from '@entur/typography'

type Props = {
    className?: string
    event: Event
}

function FromAndToTitle({ className, event }: Props): ReactElement {
    return (
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
    )
}

export default FromAndToTitle
