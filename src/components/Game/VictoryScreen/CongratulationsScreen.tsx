import { Heading1 } from '@entur/typography'
import { PrimaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import { ForwardIcon } from '@entur/icons'
import Congratulations_background from '@/lib/assets/images/Congratulations_background.svg'
import Congratulations_ticket from '@/lib/assets/images/Congratulations_ticket.svg'
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
                        src={Congratulations_ticket}
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
                    src={Congratulations_background}
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
