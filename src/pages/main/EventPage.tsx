import React, { useEffect } from 'react'
import { Heading2 } from '@entur/typography'

import SelectLevel from '../../components/SelectLevel'
import { useBackground } from '../../backgroundContext'
import { Contrast } from '@entur/layout'

export function EventPage(): JSX.Element {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')

        return () => setBackgroundColor('bg-blue-90')
    }, [setBackgroundColor])

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <Contrast>
                <Heading2>Hvor erfaren er du?</Heading2>
                <SelectLevel isEvent={true} />
            </Contrast>
        </div>
    )
}

export default EventPage
