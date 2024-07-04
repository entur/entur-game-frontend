import React, { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contrast, NavigationCard } from '@entur/layout'
import { MobilityIcon, NorwayIcon } from '@entur/icons'
import { Loader } from '@entur/loader'
import useSWR from 'swr'
import { useBackground } from '../contexts/backgroundContext'
import { getActiveGameModeEvent } from '../api/gameModeApi'

export function OptionPage(): ReactElement {
    const { data: activeGameMode } = useSWR('/game-mode/active-event', () =>
        getActiveGameModeEvent(),
    )
    const { setBackgroundColor } = useBackground()
    const navigate = useNavigate()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')
    }, [])

    if (activeGameMode === undefined) {
        return <Loader>Laster inn...</Loader>
    }

    return (
        <div className="bg-blue-main flex flex-col justify-center items-center min-h-screen min-w-screen">
            <Contrast>
                <div className="space-y-10 mt-10">
                    <NavigationCard
                        title="Konkurransemodus"
                        titleIcon={<MobilityIcon />}
                        onClick={() => {
                            navigate(
                                `/game/${activeGameMode?.difficulty ?? 'event4'}`,
                            )
                        }}
                    >
                        Bli med på en reise og vinn en el-sparkesykkel. Den
                        beste VINNER - kanskje det er deg?
                    </NavigationCard>
                    <NavigationCard
                        title="Øvelsesmodus"
                        titleIcon={<NorwayIcon />}
                        onClick={() => navigate('/practice')}
                    >
                        For å bli kjent med spillet så kan du enten spille alene
                        eller utfordre hverandre!
                    </NavigationCard>
                </div>
            </Contrast>
        </div>
    )
}
