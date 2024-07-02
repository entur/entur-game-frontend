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
                <img
                    className="cursor-pointer ml-5 mr-20 block h-full pt-12"
                    onClick={() => navigate('/')}
                    src={EnturPartnerIconDark}
                    alt="entur partner"
                />
            </>
        )
    }

    const Light = () => {
        return (
            <>
                <img
                    className="cursor-pointer  ml-5 mr-20 block h-full pt-12"
                    onClick={() => navigate('/')}
                    src={EnturPartnerIconLight}
                    alt="entur partner"
                />
            </>
        )
    }

    const { backgroundColor } = useBackground()
    const navigate = useNavigate()
    const IconComponent = backgroundColor === 'bg-blue-main' ? Light : Dark

    return (
        <div className={`flex ${backgroundColor} w-screen min-h-screen`}>
            <IconComponent />
            {children}
        </div>
    )
}

export default BackgroundComponent
