'use client'

import { Heading2, Paragraph } from '@entur/typography'
import { getModeTranslation } from '@/lib/utils/transportMapper'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { QueryMode, StopPlace } from '@entur/sdk'

type Props = {
    mode: QueryMode
    stopPlace: StopPlace
}
function DeadScreen({ mode, stopPlace }: Props): JSX.Element {
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
