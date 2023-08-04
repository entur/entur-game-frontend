import React, { ReactElement } from 'react'
import SplashScreen from '../components/SplashScreen/SplashScreen'

export function MainMenu(): ReactElement {
    return (
        <div className="bg-blue-main h-screen w-screen">
            <SplashScreen />
        </div>
    )
}
