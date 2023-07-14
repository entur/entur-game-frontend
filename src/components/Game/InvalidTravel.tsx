import { QueryMode } from '@entur/sdk'
import { getModeTranslation } from '../../utils/transportMapper'
import { Modal, ModalOverlay } from '@entur/modal'
import React, { useEffect, useState } from 'react'
import { Paragraph } from '@entur/typography'
import liv from '@assets/images/Liv.svg'

type Props = {
    usedMode: QueryMode[]
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    stopPlace: string
}


export function InvalidTravel({ usedMode, showModal, setShowModal, stopPlace }: Props):JSX.Element {



return (
    <Modal
        open={showModal}
        onDismiss={() => setShowModal(false)}
        title="Oops! En bomtur"
        size="medium"
    >
        <div className='flex flex-row'>
        <img src={liv}></img>
        <Paragraph className='self-center'>
            {`Det er ikke mulig å ta ${getModeTranslation(usedMode[usedMode.length-1]).toLowerCase()} fra ${stopPlace}.`}
        </Paragraph>
        </div>
    </Modal>
)
}