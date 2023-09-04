import React, { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contrast, NavigationCard } from '@entur/layout'
import { MobilityIcon, NorwayIcon } from '@entur/icons'
import { useBackground } from '../backgroundContext'
import { useFlags } from 'flagsmith/react'
import { EVENT } from '../constant/levels'

export function OptionMenu(): ReactElement {
    const { javazone2 } = useFlags(['javazone2'])
    const { setBackgroundColor } = useBackground()
    const navigate = useNavigate()
    const javazoneIdOne = EVENT[0].id
    const javazoneIdTwo = EVENT[1].id

    useEffect(() => {
        setBackgroundColor('bg-blue-main')
    }, [])

    return (
        <div className="bg-blue-main flex flex-col justify-center items-center min-h-screen min-w-screen">
            <Contrast>
                <div className="space-y-10 mt-10">
                    <NavigationCard
                        title="Konkurransemodus"
                        titleIcon={<MobilityIcon />}
                        onClick={() => {
                            const level = javazone2.enabled
                                ? javazoneIdTwo
                                : javazoneIdOne
                            navigate(`/game/${level}`)
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
