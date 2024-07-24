'use client'

import { Heading1 } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import { ForwardIcon } from '@entur/icons'
import Gratulerer from '@/lib/assets/images/Gratulerer.svg'
import Image from 'next/image'
import { Screen } from './VictoryScreen'

interface CongratulationsScreenProps {
    scoreValue: number
    setCurrentScreen: (screen: Screen) => void
}

function CongratulationsScreen({
    scoreValue,
    setCurrentScreen,
}: CongratulationsScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <Contrast className="text-center">
            <Heading1>Gratulerer, du er fremme!</Heading1>
            <div className="relative w-full mt-8">
                <Heading1 className="absolute inset-x-0 right-16 top-44 text-8xl text-coral transform rotate-6">
                    {scoreValue}
                </Heading1>
                <Heading1 className="absolute inset-x-0 right-20 top-64 text-6xl text-coral transform rotate-6">
                    poeng
                </Heading1>
                <Image
                    src={Gratulerer}
                    alt="entur partner"
                    width={2000}
                    className="my-4"
                />
            </div>
            <PrimaryButton onClick={() => setCurrentScreen(Screen.Results)}>
                <span className="flex items-center">
                    Resultater
                    <ForwardIcon className="ml-2 mb-1.5 relative" />
                </span>
            </PrimaryButton>
        </Contrast>
    )
}

export default CongratulationsScreen
