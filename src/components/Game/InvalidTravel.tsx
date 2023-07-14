import { QueryMode } from '@entur/sdk'
import { getModeTranslation } from '../../utils/transportMapper'
import { Modal } from '@entur/modal'
import React from 'react'
import { Paragraph } from '@entur/typography'
import brokenHeart from '@assets/images/broken-heart.svg'

type Props = {
    usedMode: QueryMode[]
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    stopPlace: string
}

export function InvalidTravel({
    usedMode,
    showModal,
    setShowModal,
    stopPlace,
}: Props): JSX.Element {
    return (
        <Modal
            open={showModal}
            onDismiss={() => setShowModal(false)}
            title="Oops, dette var en bomtur!"
            size="medium"
        >
            <div className="flex flex-row">
                <img src={brokenHeart} alt="broken heart"></img>
                <Paragraph className="self-center">
                    {`Det er ikke mulig å ta ${getModeTranslation(
                        usedMode[usedMode.length - 1],
                    ).toLowerCase()} fra ${stopPlace}.`}
                </Paragraph>
            </div>
        </Modal>
    )
}
