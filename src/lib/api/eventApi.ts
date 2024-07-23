import { BackendEvent, Event } from '../types/types'
import { StopPlace } from '../types/types'
import { fetchStopPlace, fetchStopPlaceChildren } from './stopPlaceApi'

const baseUrl = 'http://localhost:8080'

export type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string }

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

export async function getInactiveEvents(): Promise<BackendEvent[] | null> {
    try {
        const response = await fetch(`${baseUrl}/event/inactive`)

        if (!response.ok) {
            console.error(
                `Failed to fetch inactive events: ${response.status} ${response.statusText}`,
            )
            return null
        }

        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

export async function getEventById(
    eventId: number,
): Promise<Result<BackendEvent | null>> {
    try {
        const response = await fetch(`${baseUrl}/event/inactive/${eventId}`)
        if (response.status !== 200) {
            return { success: false, error: 'Failed to fetch event' }
        }
        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        return { success: false, error: 'Network error' }
    }
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

export async function getEventByEventName(
    eventName: string,
): Promise<Result<Event>> {
    const baseEventResult = await getBackendEventByEventName(eventName)
    if (!baseEventResult.success) {
        return { success: false, error: baseEventResult.error }
    }
    const baseEvent = baseEventResult.data

    const startLocationItem = await fetchStopPlace(baseEvent.startLocationId)

    const endlocationChildrenIds = await fetchStopPlaceChildren(
        baseEvent.endLocationId,
    )
    const endlocationIds = endlocationChildrenIds
        ? [baseEvent.endLocationId, ...endlocationChildrenIds]
        : [baseEvent.endLocationId]

    const endLocationItem = await Promise.all(
        endlocationIds.map((id) => fetchStopPlace(id)),
    )

    if (!startLocationItem || endLocationItem.includes(null)) {
        return { success: false, error: 'Failed to fetch stop place names' }
    }

    const startLocation: StopPlace = {
        id: baseEvent.startLocationId,
        name: startLocationItem.name,
        longitude: startLocationItem.longitude,
        latitude: startLocationItem.latitude,
    }

    const endLocation: StopPlace[] = endlocationIds.map((id, index) => ({
        id: id,
        name: endLocationItem[index]!.name,
        longitude: endLocationItem[index]!.longitude,
        latitude: endLocationItem[index]!.latitude,
    }))

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
        } as Event,
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

export async function getTripLocations(
    eventName: string,
): Promise<Result<{ startLocationName: string; endLocationNames: string[] }>> {
    const eventResult = await getEventByEventName(eventName)

    if (!eventResult.success) {
        return { success: false, error: eventResult.error }
    }

    const event = eventResult.data

    const startLocationName = event.startLocation.name
    const endLocationNames = event.endLocation.map((location) => location.name)

    return {
        success: true,
        data: {
            startLocationName,
            endLocationNames,
        },
    }
}

export async function deleteEvent(eventId: number): Promise<void> {
    const response = await fetch(`${baseUrl}/event/${eventId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`)
    }
}
