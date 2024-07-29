'use client'

import { Heading2, Heading3, Paragraph } from '@entur/typography'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import React from 'react'
import { Contrast } from '@entur/layout'
import Ripped_Ticket from '@/lib/assets/images/Ripped_Ticket.svg'
import Image from 'next/image'

function DeadScreen(): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <>
            <Contrast>
                <div className="flex flex-col items-center">
                    <Heading2>Ånei! Billetten din er utløpt!</Heading2>
                    <Paragraph>
                        Du rakk dessverre ikke fram til mål i tide
                    </Paragraph>

                    <Image
                        src={Ripped_Ticket}
                        alt="entur partner"
                        width={600}
                        style={{ height: 'auto' }}
                        priority={true}
                    />
                    <Heading3 margin="both">
                        Velg om du vil avslutte eller prøve igjen
                    </Heading3>
                    <div className="flex gap-6 mt-10">
                        <SecondaryButton
                            size="large"
                            onClick={() => window.location.reload()}
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
