'use client'

import React, { useState } from 'react'
import { Contrast } from '@entur/layout'
import { Event } from '@/lib/types/types'
import CongratulationsScreen from './CongratulationsScreen'
import ResultsScreen from './ResultsScreen'
import { RegisterScreen } from './RegisterScreen'
import { formatIntervalToSeconds } from '@/lib/utils/dateFnsUtils'
import { SWRProvider } from '@/app/providers/SWRProvider'

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

    const scoreValue =
        Math.round(
            1000 *
                (event.optimalTravelTime /
                    formatIntervalToSeconds(currentTime, startTime)),
        ) / 10

    const totalTravelTime = formatIntervalToSeconds(currentTime, startTime)
    window.scrollTo(0, 0)
    return (
        <Contrast>
            {currentScreen === Screen.Congratulations && (
                <CongratulationsScreen
                    scoreValue={scoreValue}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
            {currentScreen === Screen.Results && (
                <SWRProvider>
                    <ResultsScreen
                        event={event}
                        numLegs={numLegs}
                        scoreValue={scoreValue}
                        totalTravelTime={totalTravelTime}
                        setCurrentScreen={setCurrentScreen}
                    />
                </SWRProvider>
            )}
            {currentScreen === Screen.Register && (
                <RegisterScreen
                    event={event}
                    numLegs={numLegs}
                    scoreValue={scoreValue}
                    totalTravelTime={totalTravelTime}
                    setCurrentScreen={setCurrentScreen}
                />
            )}
        </Contrast>
    )
}

export default VictoryScreen
