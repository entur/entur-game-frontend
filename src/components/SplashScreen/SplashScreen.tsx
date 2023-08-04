import React from 'react'
import { Heading1, Heading3, Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useNavigate } from 'react-router-dom'
import {
    ArtBoardCircleImage,
    ArtBoardCookieImage,
    ArtBoardOvalImage,
} from './SplashScreenArt'

export function SplashScreen(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ArtBoardOvalImage className="absolute sm:-top-72 sm:left-10 -top-64" />
            <ArtBoardCookieImage className="absolute sm:right-[22rem] right-24 sm:bottom-0 bottom-16" />
            <ArtBoardCircleImage className="absolute bottom-32 right-[-19rem]" />
            <div className="flex flex-col justify-center place-item-center z-10">
                <div className="flex flex-row place-items-center space-x-5 justify-center items-center">
                    <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                        EN
                    </Heading1>
                    <Heading1 className="text-coral sm:text-6xl text-3xl shrink">
                        MIDDELS
                    </Heading1>
                    <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                        TUR
                    </Heading1>
                </div>
                <div className="flex flex-col place-items-center mt-24 z-10">
                    <Heading3 className="text-white font-normal" margin="none">
                        Velkommen om bord!
                    </Heading3>
                    <Paragraph className="text-white max-w-md text-center font-normal">
                        Er du smartere enn vår reiseplanlegger? Bli med på og
                        vinn gratis kollektivreiser!
                    </Paragraph>
                </div>
                <Button
                    className="sm:ml-20 font-semibold max-w-xs"
                    onClick={() => navigate('/main')}
                    variant="success"
                >
                    Kjør!
                </Button>
            </div>
        </div>
    )
}

export default SplashScreen
