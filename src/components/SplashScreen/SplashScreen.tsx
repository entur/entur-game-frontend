'use client'

import { LeadParagraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Entur_logo_contrast from '@/lib/assets/images/Entur_logo_contrast.svg'
import { getActiveEvent } from '@/lib/api/eventApi'
import { useEffect, useState } from 'react'

export function SplashScreen(): JSX.Element {
    const router = useRouter()
    const [activeEventName, setActiveEventName] = useState<string | null>(null)

    useEffect(() => {
        const getActiveEventName = async () => {
            const event = await getActiveEvent()
            if (event) {
                setActiveEventName(event.eventName)
            }
        }
        getActiveEventName()
    }, [])

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <Image
                    className="cursor-pointer"
                    src={Entur_logo_contrast}
                    alt="entur partner"
                    width={800}
                />
                <LeadParagraph className="text-white font-normal text-left">
                    Klarer du å finne en like effektiv rute som Enturs
                    reiseplanlegger?
                    <br />
                    De mest effektive rutevalgene gir deg mest poeng.
                    <br />
                    Klarer du å finne en like effektiv rute som Enturs
                    reiseplanlegger?
                </LeadParagraph>
                <div className="mt-12 w-80 mx-auto">
                    <Button
                        className="font-semibold w-full h-16"
                        onClick={() => router.push(`/game/${activeEventName}`)}
                        variant="success"
                    >
                        Jeg er klar!
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SplashScreen
