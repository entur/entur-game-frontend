import { BackendEvent, Event } from '../types/types'
import { StopPlace } from '@entur/sdk/lib/fields/StopPlace'

const baseUrl = 'http://localhost:8080'

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
): Promise<BackendEvent | null> {
    const response = await fetch(`${baseUrl}/event/${eventName}`)
    if (response.status !== 200) return null
    return response.json()
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

async function fetchStopPlaceChildren(
    stopPlaceId: string,
): Promise<string[] | null> {
    try {
        const response = await fetch(
            `https://api.entur.io/stop-places/v1/read/stop-places/${stopPlaceId}/children`,
        )

        if (!response.ok) {
            throw new Error(
                `Failed to fetch data. Status code: ${response.status}`,
            )
        }

        const data: StopPlace[] = await response.json()

        const ids = data.map((child) => child.id)
        return ids
    } catch (error) {
        console.error('Error fetching stop place children:', error)
        return null
    }
}

export async function getEventByEventName(
    eventName: string,
): Promise<Event | null> {
    const baseEvent = await getBackendEventByEventName(eventName)
    if (!baseEvent) return null

    const startLocationName = await fetchStopPlaceName(
        baseEvent.startLocationId,
    )

    const endlocationChildrenIds = await fetchStopPlaceChildren(
        baseEvent.endLocationId,
    )
    const endlocationIds = endlocationChildrenIds
        ? [baseEvent.endLocationId, ...endlocationChildrenIds]
        : [baseEvent.endLocationId]

    console.log(endlocationIds)

    const endLocationNames = await Promise.all(
        endlocationIds.map((id) => fetchStopPlaceName(id)),
    )

    if (!startLocationName || endLocationNames.includes(null)) {
        return null
    }

    const startLocation: StopPlace = {
        id: baseEvent.startLocationId,
        name: startLocationName,
    }

    const endLocation: StopPlace[] = endlocationIds.map((id, index) => ({
        id: id,
        name: endLocationNames[index]!,
    }))

    console.log(endLocation)
    return {
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
