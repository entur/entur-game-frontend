import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import EnturPartnerIcon from '../../assets/icons/EnturPartner.svg'

export function MenuNavBar(): ReactElement {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row pt-4 justify-between item-center">
            <div className="self-center ml-5 mr-20">
                <img
                    className="cursor-pointer"
                    onClick={() => navigate('/')}
                    src={EnturPartnerIcon}
                    alt="entur partner"
                />
            </div>
        </div>
    )
}
