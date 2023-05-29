import React from 'react'
import { TrainIcon } from '@entur/icons'
import { Heading3 } from '@entur/typography'

export function HpBar({ totalHp }: { totalHp: number }): JSX.Element {
    const hpTrain = []
    for (let i = 0; i < totalHp; i++) {
        const HpTrainIcon = (
            <TrainIcon
                key={Math.floor(Math.random() * 1000)}
                style={{ marginRight: '10px', marginTop: '10px' }}
                size="30"
            />
        )
        hpTrain.push(HpTrainIcon)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
            }}
        >
            <Heading3 style={{ marginRight: '10px' }}>Liv: </Heading3>
            {hpTrain.map((hp) => hp)}
        </div>
    )
}
