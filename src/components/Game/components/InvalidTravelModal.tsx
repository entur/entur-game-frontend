import { QueryMode } from '@entur/sdk'
import { getModeTranslation } from '@/lib/utils/transportMapper'
import { Modal } from '@entur/modal'
import React from 'react'
import { Paragraph } from '@entur/typography'
import brokenHeart from '@/lib/assets/icons/BrokenHeart.svg'

type Props = {
    usedMode: QueryMode[]
    noTransport: boolean
    setNoTransport: React.Dispatch<React.SetStateAction<boolean>>
    stopPlace: string
}

export function InvalidTravelModal({
    usedMode,
    noTransport,
    setNoTransport,
    stopPlace,
}: Props): JSX.Element {
    return (
        <Modal
            open={noTransport}
            onDismiss={() => setNoTransport(false)}
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
