'use client'

import React from 'react'
import { Contrast } from '@entur/layout'
import { Event } from '@/lib/types/types'

interface VictoryScreenProps {
    event: Event
    numLegs: number
    currentTime: Date
    startTime: Date
}

function VictoryScreen({
    event,
    numLegs,
    currentTime,
    startTime,
}: VictoryScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <Contrast>
            <p>
                {event.eventId}, {numLegs}, {currentTime.toDateString()},{' '}
                {startTime.toDateString()}
            </p>
        </Contrast>
    )
}

export default VictoryScreen
