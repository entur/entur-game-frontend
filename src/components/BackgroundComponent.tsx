import React, { ReactElement } from 'react'
import { useBackground } from '../contexts/backgroundContext'
import { useNavigate } from 'react-router-dom'
import EnturPartnerIconDark from '../assets/icons/EnturPartnerDark.svg'
import EnturPartnerIconLight from '../assets/icons/EnturPartnerLight.svg'

type Props = {
    children: ReactElement
}

const BackgroundComponent = ({ children }: Props): ReactElement => {
    const Dark = () => {
        return (
            <>
                <div className="pt-10 ml-5 mr-20">
                    <img
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                        src={EnturPartnerIconDark}
                        alt="entur partner"
                    />
                </div>
            </>
        )
    }

    const Light = () => {
        return (
            <>
                <div className="pt-10 ml-5 mr-20">
                    <img
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                        src={EnturPartnerIconLight}
                        alt="entur partner"
                    />
                </div>
            </>
        )
    }

    const { backgroundColor } = useBackground()
    const navigate = useNavigate()
    const IconComponent = backgroundColor === 'bg-blue-main' ? Light : Dark

    return (
        <div
            className={`flex flex-col ${backgroundColor} w-screen min-h-screen`}
        >
            <IconComponent />
            {children}
        </div>
    )
}

export default BackgroundComponent
