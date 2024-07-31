import { Heading1 } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import { ForwardIcon } from '@entur/icons'
import Framme_background from '@/lib/assets/images/Framme_Background.svg'
import Framme_Ticket from '@/lib/assets/images/Framme_Ticket.svg'
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
                <div className="relative">
                    <Image
                        src={Framme_Ticket}
                        alt="entur partner"
                        width={360}
                        className="absolute inset-x-0 mx-auto -top-4 xl:top-8 2xl:top-20"
                    />
                    <Heading1 className="absolute inset-x-0 right-16 top-20 xl:top-32 2xl:top-44 text-8xl text-coral transform rotate-6">
                        {scoreValue}
                    </Heading1>
                    <Heading1 className="absolute inset-x-0 right-20 top-40 xl:top-52 2xl:top-64 text-6xl text-coral transform rotate-6">
                        poeng
                    </Heading1>
                </div>
                <Image
                    src={Framme_background}
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
