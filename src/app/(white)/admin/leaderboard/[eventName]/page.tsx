'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import { Loader } from '@entur/loader'

import Game from '@/components/Game/GameScreen'
import GameNavBar from '@/components/NavBar/GameNavBar'
import { getEventByEventName } from '@/lib/api/eventApi'
import { Event } from '@/lib/types/types'

export default function GamePage(): JSX.Element {
    const [startTimer] = useState<number>(Date.now())
    const [timeDescription, setTimeDescription] = useState<string>('')
    const [numLegs, setNumLegs] = useState<number>(0)
    const [totalHp, setTotalHp] = useState<number>(2)

    const { eventName } : {eventName: string} = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    const [isEventError, setEventError] = useState<boolean>(false)

    useEffect(() => {
        async function fetchEventJson() {
            if (!eventName) {
                setEventError(true)
                return
            }

            const eventJson = await getEventByEventName(eventName) 
            if (eventJson === null) {
                setEventError(true)
                return
            } else {
                setEventError(false)
                setEvent(eventJson)
            }
            
        }
        fetchEventJson()
    }, [])

    if (isEventError) {
        // TODO: redirect to main screen
        return (
            <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
                <Heading1>Event ikke funnet</Heading1>
            </div>
        )
    }
    if (event === null) { //TODO: errorHandling dersom event=== null for lenge. "event not found" bør vises i stedet etter en viss tid
        return <Loader>Lasterer...</Loader>
    }

    return (
        <div className="max-w-md ml-56 p-4 ">
            <BlockquoteFooter>Ledertavle</BlockquoteFooter>
            <Heading1>Arendal stasjon - Trondheim S</Heading1>
            <div className="pb-0 mb-0">
                <LeadParagraph>
                    Ledertavle for nåværende rute
                </LeadParagraph>
            </div>
        </div>
    )
}