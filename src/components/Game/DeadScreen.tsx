'use client'

import { Heading2, Paragraph } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
interface DeadScreenProps {
    endLocationName: string;
}

function DeadScreen({ endLocationName }: DeadScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <>
            <Heading2>Billetten din har utløpt!</Heading2>
            <Paragraph>
                Du rakk dessverre ikke å komme deg til {endLocationName} i tide.
            </Paragraph>
            <PrimaryButton onClick={() => window.location.reload()}>
                Prøv igjen
            </PrimaryButton>
        </>
    )
}

export default DeadScreen
