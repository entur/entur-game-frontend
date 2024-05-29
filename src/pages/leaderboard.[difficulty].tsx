import React, { ReactElement, useEffect } from 'react'
import { useBackground } from '../contexts/backgroundContext'
import { LeaderBoard } from '../components/LeaderBoard'

export function LeaderboardPage(): ReactElement {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')

        return () => setBackgroundColor('bg-blue-90')
    }, [setBackgroundColor])

    return <LeaderBoard />
}
