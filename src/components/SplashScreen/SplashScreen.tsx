import React from 'react'
import { Heading1, Heading3, Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useNavigate } from 'react-router-dom'
import {
    SplashArtBoardCircleImage,
    SplashArtBoardCookieImage,
    SplashArtBoardOvalImage,
} from './SplashScreenArt'

export function SplashScreen(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SplashArtBoardOvalImage className="absolute sm:-top-72 sm:left-10 -top-64" />
            <SplashArtBoardCookieImage className="absolute sm:right-[35rem] right-24 sm:bottom-12 bottom-20" />
            <SplashArtBoardCircleImage className="absolute bottom-32 right-[-20rem]" />
            <div className="flex flex-col justify-center place-item-center z-10">
                <div className="flex flex-row place-items-center space-x-5 justify-center items-center">
                    <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                        EN
                    </Heading1>
                    <Heading1 className="text-coral sm:text-6xl text-3xl shrink italic">
                        SHOW AND TELL
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
                        Lyst på en pose twist? finn en bedre reiserute en
                        kollegaene dine!
                    </Paragraph>
                </div>
                <div className="place-self-center w-48">
                    <Button
                        className="font-semibold w-full"
                        onClick={() => navigate('/event')}
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
