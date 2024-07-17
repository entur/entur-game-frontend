'use client'

import { Heading2, Paragraph } from '@entur/typography'
import { getModeTranslation } from '@/lib/utils/transportMapper'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { QueryMode } from '@entur/sdk'
import { StopPlace } from '@/lib/types/types'

function DeadScreen(): JSX.Element {
    window.scrollTo(0, 0) // Scroll to top of the screen
    return (
        <>
            <Heading2>Du døde!</Heading2>
            <Paragraph>
                {`Du brukte desverre for lang tid.`}
            </Paragraph>
            <PrimaryButton onClick={() => window.location.reload()}>
                Prøv igjen
            </PrimaryButton>
        </>
    )
}

export default DeadScreen
