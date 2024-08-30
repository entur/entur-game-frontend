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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getActiveEventName = async () => {
            const event = await getActiveEvent()
            if (event) {
                setActiveEventName(event.eventName)
            }
        }
        getActiveEventName()
    }, [])

    const handleClick = () => {
        setLoading(true)
        router.push(`/game/${activeEventName}`)
    }

    return (
        <div className="flex flex-col items-center justify-between min-h-screen text-white">
            <div className="mt-12 2xl:mt-20 text-center">
                <Image
                    className="cursor-pointer max-w-md xl:max-w-lg 2xl:max-w-2xl"
                    src={Entur_logo_contrast}
                    alt="entur partner"
                    width={800}
                />
                <LeadParagraph className="mt-0 xl:mt-8 text-white font-normal text-center">
                    Kommer du i mål før billetten din utløper?
                    <br />
                    Kortere reisetid gir mer poeng.
                    <br />
                    Klarer du å slå Enturs reiseplanlegger?
                </LeadParagraph>
                <div className="mt-4 2xl:mt-12 w-80 mx-auto">
                    <Button
                        className="font-semibold w-full h-12 xl:h-16"
                        onClick={handleClick}
                        variant="success"
                        loading={loading}
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
