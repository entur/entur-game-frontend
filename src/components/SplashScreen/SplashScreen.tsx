'use client'

import { LeadParagraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Entur_logo_contrast from '@/lib/assets/images/Entur_logo_contrast.svg'
import Test from '@/lib/assets/images/Test.gif'
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
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="text-center">
                <Image
                    className="cursor-pointer"
                    src={Entur_logo_contrast}
                    alt="entur partner"
                    width={800}
                />
                <LeadParagraph className="text-white font-normal text-center mt-4">
                    Finn den beste kollektivreisen til mål før billetten din
                    utløper!
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
            <div className="mt-auto w-full">
                <Image
                    src={Test}
                    alt="Animated GIF"
                    layout="responsive"
                    width={1600}
                    height={900}
                />
            </div>
        </div>
    )
}

export default SplashScreen
