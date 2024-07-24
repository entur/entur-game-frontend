'use client'

import { Heading1, Paragraph } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import { Event } from '@/lib/types/types'
interface ScoreScreenProps {
    event: Event
}

function ScoreScreen({ event }: ScoreScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <>
            <Contrast>
                <Heading1>Resultater</Heading1>
                <Paragraph>
                    {`Du rakk dessverre ikke å komme deg til ${event.eventName} i tide.`}
                </Paragraph>
                <PrimaryButton onClick={() => window.location.reload()}>
                    Prøv igjen
                </PrimaryButton>
            </Contrast>
        </>
    )
}

export default ScoreScreen
