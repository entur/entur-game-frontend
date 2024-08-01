'use client'

import { Heading1, Heading2, Heading3 } from '@entur/typography'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import Ripped_Ticket from '@/lib/assets/images/Ripped_Ticket.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function DeadScreen(): JSX.Element {
    const router = useRouter()
    window.scrollTo(0, 0)

    const handleNavigation = () => {
        router.push('/')
    }

    return (
        <>
            <Contrast>
                <div className="flex flex-col items-center w-full min-h-full">
                    <Heading1
                        className="text-coral mb-4 xl:mb-8 text-55"
                        margin="none"
                    >
                        Ånei! Billetten din er utløpt!
                    </Heading1>
                    <Heading2 margin="none">
                        Du rakk dessverre ikke fram til mål i tide
                    </Heading2>
                    <Image
                        className="mt-4 xl:mt-16 w-80 2xl:w-[500px]"
                        src={Ripped_Ticket}
                        alt="ripped ticket"
                        width={500}
                        style={{ height: 'auto' }}
                        priority={true}
                    />
                    <Heading3 margin="none" className="mt-4 xl:mt-16">
                        Velg om du vil avslutte eller prøve igjen
                    </Heading3>
                    <div className="flex gap-6 mt-4 xl:mt-8">
                        <SecondaryButton
                            size="large"
                            onClick={handleNavigation}
                        >
                            Avslutt
                        </SecondaryButton>
                        <PrimaryButton
                            size="large"
                            onClick={() => window.location.reload()}
                        >
                            Prøv igjen
                        </PrimaryButton>
                    </div>
                </div>
            </Contrast>
        </>
    )
}

export default DeadScreen
