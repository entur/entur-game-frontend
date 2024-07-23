import { Button } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { BaseCard } from '@entur/layout'
import { Heading3 } from '@entur/typography'
import { ReactElement } from 'react'

type Props = {
    eventName: string
}

function InactiveEvent({ eventName }: Props): ReactElement {
    return (
        <div className="flex gap-4 items-center mb-6">
            <BaseCard className="max-w-md px-6 py-5">
                <Heading3 margin="none">{eventName}</Heading3>
            </BaseCard>
            <Button width="auto" variant="negative" size="small">
                <DeleteIcon className="inline align-baseline " />
                Slett spill
            </Button>
        </div>
    )
}

export default InactiveEvent
