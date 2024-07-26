import React from 'react'
import { Modal } from '@entur/modal'
import { Paragraph } from '@entur/typography'
import { Button, SecondaryButton } from '@entur/button'

export const WinnerWarningModal = ({
    isWinnerEndOpen,
    setWinnerEndOpen,
    handleDrawWinnerAndEndGame,
}: {
    isWinnerEndOpen: boolean
    setWinnerEndOpen: (open: boolean) => void
    handleDrawWinnerAndEndGame: () => void
}) => (
    <Modal
        open={isWinnerEndOpen}
        onDismiss={() => setWinnerEndOpen(false)}
        title="Trekk vinner og avslutt spill?"
        size="medium"
    >
        <Paragraph>
            Når du trekker en vinner avsluttes spillet automatisk. Det vil være
            mulig å gjenåpne spillet igjen på et senere tidspunkt.
        </Paragraph>
        <div className="flex gap-4">
            <SecondaryButton
                className="w-[81px]"
                onClick={() => setWinnerEndOpen(false)}
            >
                Avbryt
            </SecondaryButton>
            <Button
                variant={'primary'}
                className="max-w-[250px]"
                onClick={handleDrawWinnerAndEndGame}
                type="button"
            >
                Trekk vinner og avslutt
            </Button>
        </div>
    </Modal>
)
