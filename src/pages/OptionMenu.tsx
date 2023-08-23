import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contrast, NavigationCard } from '@entur/layout'
import { MobilityIcon, NorwayIcon } from '@entur/icons'

export function OptionMenu(): ReactElement {
    const navigate = useNavigate()
    return (
        <div className="bg-blue-main flex flex-col justify-center items-center min-h-screen min-w-screen">
            <Contrast>
                <div className="space-y-10 mt-10">
                    <NavigationCard
                        title="Konkurranse modus"
                        titleIcon={<MobilityIcon />}
                        onClick={() => navigate('/main')}
                    >
                        Bli med på en reise og vinn en el-sparkesykkel. Den
                        beste VINNER - kanskje det er deg?
                    </NavigationCard>
                    <NavigationCard
                        title="Øve modus"
                        titleIcon={<NorwayIcon />}
                        onClick={() => navigate('/main')}
                    >
                        Får å bli kjent med spillet så kan du prøve vår
                        Enspiller eller Flerspiller modus!
                    </NavigationCard>
                </div>
            </Contrast>
        </div>
    )
}
