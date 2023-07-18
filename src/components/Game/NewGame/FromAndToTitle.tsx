import React, { ReactElement } from 'react'

import { Level } from '../../../constant/levels'

type Props = {
    level: Level
}

function FromAndToTitle({ level }: Props): ReactElement {
    return (
        <div className="flex flex-row space-x-1">
            <div className="text-xl font-semibold">Du skal reise fra</div>
            <div className="text-xl font-semibold text-coral">
                {level.start.name}
            </div>
            <div className="text-xl font-semibold">til</div>
            <div className="text-xl font-semibold text-coral">
                {level.targets[0].name}
            </div>
        </div>
    )
}

export default FromAndToTitle
