'use client'

import React, { useState } from 'react'
import { Contrast } from '@entur/layout'
import { Event } from '@/lib/types/types'
import CongratulationsScreen from './CongratulationsScreen'
import ResultsScreen from './ResultsScreen'
import { RegisterScreen } from './RegisterScreen'

export enum Screen {
    Congratulations,
    Results,
    Register,
}

interface VictoryScreenProps {
    event: Event
    numLegs: number
    startTime: Date
    currentTime: Date
}

function VictoryScreen({
    event,
    numLegs,
    startTime,
    currentTime,
}: VictoryScreenProps): JSX.Element {
    const [currentScreen, setCurrentScreen] = useState<Screen>(
        Screen.Congratulations,
    )

    window.scrollTo(0, 0)
    return (
        <Contrast>
            {currentScreen === Screen.Congratulations && (
                <CongratulationsScreen setCurrentScreen={setCurrentScreen} />
            )}
            {currentScreen === Screen.Results && (
                <ResultsScreen
                    event={event}
                    numLegs={numLegs}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
            {currentScreen === Screen.Register && (
                <RegisterScreen
                    event={event}
                    numLegs={numLegs}
                    startTime={startTime}
                    currentTime={currentTime}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
        </Contrast>
    )
}

export default VictoryScreen
