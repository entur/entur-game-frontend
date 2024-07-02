import React, { ReactElement, useEffect } from 'react'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import { useBackground } from '../contexts/backgroundContext'
import { Contrast } from '@entur/layout'

export function MainPage(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')

        return () => setBackgroundColor('bg-blue-90')
    }, [setBackgroundColor])

    return <SplashScreen />
}
