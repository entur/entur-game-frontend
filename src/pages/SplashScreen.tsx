import './SplashScreen.css'

import React from 'react'
import { Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useNavigate } from 'react-router-dom'

export function SplashScreen(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="splashScreen">
            <div className="illustration1" />
            <div className="illustration2" />
            <div className="illustration3" />
            <div className="centertext">
                <Paragraph className="en">EN</Paragraph>
                <Paragraph className="middels">MIDDELS</Paragraph>
                <Paragraph className="tur">TUR</Paragraph>
            </div>
            <div className="infotext">
                <Paragraph margin="none" className="welcometext">
                    Velkommen om bord!
                </Paragraph>
                <Paragraph className="questiontext">
                    Er du smartere enn vår reiseplanlegger? Bli med på turen og
                    vinn gratis kollektivreiser!
                </Paragraph>
            </div>
            <Button
                className="button"
                onClick={() => navigate('/')}
                variant={'success'}
            >
                Kjør!
            </Button>
        </div>
    )
}

export default SplashScreen
