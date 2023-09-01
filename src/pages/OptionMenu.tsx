import React, { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contrast, NavigationCard } from '@entur/layout'
import { MobilityIcon, NorwayIcon } from '@entur/icons'
import { useBackground } from '../backgroundContext'

export function OptionMenu(): ReactElement {
    const { setBackgroundColor } = useBackground()
    const navigate = useNavigate()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')
    }, [])

    return (
        <div className="bg-blue-main flex flex-col justify-center items-center min-h-screen min-w-screen">
            <Contrast>
                <div className="space-y-10 mt-10">
                    <NavigationCard
                        title="Konkurranse modus"
                        titleIcon={<MobilityIcon />}
                        onClick={() => navigate('/event')}
                    >
                        Bli med på en reise og vinn en el-sparkesykkel. Den
                        beste VINNER - kanskje det er deg?
                    </NavigationCard>
                    <NavigationCard
                        title="Øve modus"
                        titleIcon={<NorwayIcon />}
                        onClick={() => navigate('/practice')}
                    >
                        For å bli kjent med spillet så kan du enten spille
                        alene eller utfordre hverandre!
                    </NavigationCard>
                </div>
            </Contrast>
        </div>
    )
}
