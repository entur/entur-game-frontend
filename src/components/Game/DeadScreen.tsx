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
                <div className="flex flex-col items-center w-full">
                    <Heading1
                        className="text-coral mb-10 text-55"
                        margin="none"
                    >
                        Ånei! Billetten din er utløpt!
                    </Heading1>
                    <Heading2 margin="none">
                        Du rakk dessverre ikke fram til mål i tide
                    </Heading2>
                    <Image
                        className="mb-16 mt-10"
                        src={Ripped_Ticket}
                        alt="entur partner"
                        width={500}
                        style={{ height: 'auto' }}
                        priority={true}
                    />
                    <Heading3 margin="none">
                        Velg om du vil avslutte eller prøve igjen
                    </Heading3>
                    <div className="flex gap-6 mt-6">
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
