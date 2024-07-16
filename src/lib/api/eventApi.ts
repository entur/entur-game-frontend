import { BackendEvent, Event } from '../types/types'
import { StopPlace } from '@entur/sdk/lib/fields/StopPlace'

const baseUrl = 'http://localhost:8080'

export type Result<T> = { success: true; data: T } | { success: false; error: string }


export async function getAllEvents(): Promise<BackendEvent[] | null> {
    const response = await fetch(`${baseUrl}/event/all`)
    if (response.status !== 200) return null
    return response.json()
}

export async function getActiveEvent(): Promise<BackendEvent | null> {
    const response = await fetch(`${baseUrl}/event/active`)
    if (response.status !== 200) return null
    return response.json()
}

export async function updateActiveEvent(gameId: number): Promise<Event> {
    const response = await fetch(`${baseUrl}/event/active/${gameId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    return response.json()
}

export async function getBackendEventByEventName(
    eventName: string,
): Promise<Result<BackendEvent>> {
    try {
        const response = await fetch(`${baseUrl}/event/${eventName}`)
        if (response.status !== 200) {
            return { success: false, error: 'Failed to fetch event' }
        }
        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        return { success: false, error: 'Network error' }
    }
}

const query = `
    query ($id: String!) {
        stopPlace(
            id: $id
        ) {
            name
        }
    }
`

async function fetchStopPlaceName(stopPlaceId: string): Promise<string | null> {
    try {
        const response = await fetch(
            'https://api.entur.io/journey-planner/v3/graphql',
            {
                method: 'POST',
                headers: {
                    'ET-Client-Name': 'enturspillet',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables: { id: stopPlaceId } }),
            },
        )
        const data = await response.json()
        if (data.errors) {
            console.error('Error fetching stop place name:', data.errors)
            return null
        }
        return data.data.stopPlace.name
    } catch (error) {
        console.error('Error fetching stop place name:', error)
        return null
    }
}

export async function getEventByEventName(
    eventName: string,
): Promise<Result<Event>> {
    const baseEventResult = await getBackendEventByEventName(eventName)
    if (!baseEventResult.success) {
        return { success: false, error: baseEventResult.error }
    }
    const baseEvent = baseEventResult.data

    const startLocationName = await fetchStopPlaceName(
        baseEvent.startLocationId,
    )
    const endLocationName = await fetchStopPlaceName(baseEvent.endLocationId)

    if (!startLocationName || !endLocationName) {
        return { success: false, error: 'Failed to fetch stop place names' }
    }

    const startLocation: StopPlace = {
        id: baseEvent.startLocationId,
        name: startLocationName,
    }

    const endLocation: StopPlace[] = [
        {
            id: baseEvent.endLocationId,
            name: endLocationName,
        },
    ]

    return {
        success: true,
        data: {
            eventId: baseEvent.eventId,
            eventName: baseEvent.eventName,
            startLocation: startLocation,
            endLocation: endLocation,
            startTime: baseEvent.startTime,
            optimalStepNumber: baseEvent.optimalStepNumber,
            optimalTravelTime: baseEvent.optimalTravelTime,
            isActive: baseEvent.isActive,
        } as Event
    }
}

export async function createOptimalRouteText(event: Event): Promise<string> {
    const totalSeconds = event?.optimalTravelTime
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `Vår reiseplanlegger har beregnet en optimal rute der antall etapper er ${event?.optimalStepNumber} og reisetid er ${hours} timer, ${minutes} minutter og ${seconds} sekunder.`
}

export async function createEvent(
    event: BackendEvent,
): Promise<BackendEvent | null> {
    try {
        const response = await fetch(`${baseUrl}/new-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`)
            return null
        }

        return await response.json()
    } catch (error) {
        console.error('Error creating new event:', error)
        return null
    }
}
