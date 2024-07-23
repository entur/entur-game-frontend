'use client'

import { Heading1 } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import { ForwardIcon } from '@entur/icons'
import Gratulerer from '@/lib/assets/images/Gratulerer.svg'
import Image from 'next/image'

function CongratulationsScreen(): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <Contrast>
            <Heading1>Gratulerer, du er fremme!</Heading1>
            <Image src={Gratulerer} alt="entur partner" width={2000} />
            <PrimaryButton onClick={() => window.location.reload()}>
                <span className="flex items-center">
                    Resultater
                    <ForwardIcon className="ml-2 mb-1.5 relative" />
                </span>
            </PrimaryButton>
        </Contrast>
    )
}

export default CongratulationsScreen
