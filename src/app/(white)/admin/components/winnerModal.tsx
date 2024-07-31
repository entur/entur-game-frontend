import React from 'react'
import { PlayerScore } from '@/lib/types/types'
import { SmallAlertBox } from '@entur/alert'
import { Modal } from '@entur/modal'

export const WinnerModal = ({
    isModalOpen,
    handleDismiss,
    leader,
    isSaveWinnerError,
}: {
    isModalOpen: boolean
    handleDismiss: () => void
    leader: PlayerScore | null
    isSaveWinnerError: boolean
}) => (
    <Modal
        open={isModalOpen}
        onDismiss={handleDismiss}
        title={leader ? `Vinner: ${leader.player.playerName}` : 'Ingen vinner'}
        size="medium"
    >
        {leader ? (
            <>
                <p>E-post: {leader.player.email}</p>
                <p>Telefon: {leader.player.phoneNumber}</p>
            </>
        ) : (
            <p>Det ble ikke trukket noen vinner i dette spillet.</p>
        )}
        {isSaveWinnerError && (
            <>
                <br />
                <SmallAlertBox
                    variant="warning"
                    width="fit-content"
                    margin="top"
                >
                    Det oppsto en feil ved lagring av vinner.
                </SmallAlertBox>
            </>
        )}
    </Modal>
)
