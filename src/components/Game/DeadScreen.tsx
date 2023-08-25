import { Heading2, Paragraph } from '@entur/typography'
import { getModeTranslation } from '../../utils/transportMapper'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { sprinkleEmojis } from 'emoji-sprinkle'
import { QueryMode, StopPlace } from '@entur/sdk'

type Props = {
    mode: QueryMode
    stopPlace: StopPlace
}
function DeadScreen({ mode, stopPlace }: Props): JSX.Element {
    sprinkleEmojis({
        emoji: '👻',
        count: 50,
        fade: 10,
        fontSize: 60,
    })
    window.scrollTo(0, 0) // Scroll to top of the screen
    return (
        <>
            <Heading2>Du døde!</Heading2>
            <Paragraph>
                {`Det går ingen avganger med ${getModeTranslation(
                    mode,
                ).toLowerCase()} fra ${stopPlace.name} i nær fremtid.`}
            </Paragraph>
            <PrimaryButton onClick={() => window.location.reload()}>
                Prøv igjen
            </PrimaryButton>
        </>
    )
}

export default DeadScreen
