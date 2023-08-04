import React from 'react'
import { Heading1, Heading3, Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useNavigate } from 'react-router-dom'

export function SplashScreen(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="bg-blue-main min-h-screen min-w-screen">
            <div className="h-screen flex flex-col justify-center">
                <div className="flex flex-row place-items-center space-x-5 justify-center items-center">
                    <Heading1 className="text-white text-6xl shrink">
                        EN
                    </Heading1>
                    <Heading1 className="text-coral text-6xl shrink">
                        MIDDELS
                    </Heading1>
                    <Heading1 className="text-white text-6xl shrink">
                        TUR
                    </Heading1>
                </div>
                <div className="flex flex-col place-items-center mt-24">
                    <Heading3 className="text-white font-normal" margin="none">
                        Velkommen om bord!
                    </Heading3>
                    <Paragraph className="text-white max-w-md text-center font-normal">
                        Er du smartere enn vår reiseplanlegger? Bli med på turen
                        og vinn gratis kollektivreiser!
                    </Paragraph>
                </div>
                <div className="self-center max-w-5xl">
                    <Button
                        className="font-semibold"
                        onClick={() => navigate('/')}
                        variant="success"
                    >
                        Kjør!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen
