import React, { ReactElement, useEffect } from 'react'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import { useBackground } from '../backgroundContext'

export function MainMenu(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')

        return () => setBackgroundColor('bg-blue-90')
    }, [setBackgroundColor])

    return <SplashScreen />
}
