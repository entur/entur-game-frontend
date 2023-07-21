import React, { ReactElement } from 'react'

import { Level } from '../../../constant/levels'
import { Heading4 } from '@entur/typography'

type Props = {
    className?: string
    level: Level
}

function FromAndToTitle({ className, level }: Props): ReactElement {
    return (
        <div className={`flex xl:flex-row flex-wrap space-x-1 ${className}`}>
            <Heading4 margin="none">Du skal reise fra</Heading4>
            <Heading4 margin="none" className="text-coral">
                {level.start.name}
            </Heading4>
            <Heading4 margin="none">til</Heading4>
            <Heading4 margin="none" className="text-coral">
                {level.targets[0].name}
            </Heading4>
        </div>
    )
}

export default FromAndToTitle
