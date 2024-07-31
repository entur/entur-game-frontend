import { BackendEvent, Event } from '../types/types'
import { StopPlace } from '../types/types'
import { fetchStopPlace, fetchStopPlaceChildren } from './stopPlaceApi'
import { BASE_URL } from '@/constants'

export type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string }

export async function getAllEvents(): Promise<BackendEvent[] | null> {
    const response = await fetch(`${BASE_URL}/event/all`)
    if (response.status !== 200) return null
    return response.json()
}

export async function getActiveEvent(): Promise<BackendEvent | null> {
    const response = await fetch(`${BASE_URL}/event/active`)
    if (response.status !== 200) return null
    return response.json()
}

export async function getInactiveEvents(): Promise<BackendEvent[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/event/inactive`)

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

export async function endActiveEvent(): Promise<Result<string>> {
    try {
        const response = await fetch(`${BASE_URL}/end-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.text()
        return { success: true, data }
    } catch (error) {
        return { success: false, error: 'Network error' }
    }
}

export const getEventById = async (eventId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/event/id/${eventId}`)
        if (response.status !== 200) {
            throw new Error('Network response not okay')
        }
        const data: BackendEvent = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error('Error fetching event by ID:', error)
        return { success: false, error: 'network' }
    }
}

export async function updateActiveEvent(gameId: number): Promise<Event> {
    const response = await fetch(`${BASE_URL}/event/active/${gameId}`, {
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
        const response = await fetch(`${BASE_URL}/event/name/${eventName}`)
        if (response.status !== 200) {
            return { success: false, error: 'Failed to fetch event' }
        }
        const data: BackendEvent = await response.json()
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
            winner: baseEvent.winner,
        } as Event,
    }
}

export async function createEvent(event: BackendEvent): Promise<Response> {
    try {
        const response = await fetch(`${BASE_URL}/new-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        return response
    } catch (error) {
        console.error('Error creating new event:', error)
        return new Response(
            JSON.stringify({
                error: 'Network error',
                message: 'Internal server error',
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
    }
}

export async function deleteEvent(eventId: number): Promise<Result<string>> {
    try {
        const response = await fetch(`${BASE_URL}/delete/${eventId}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            return {
                success: false,
                error: `Error: ${response.status} - ${response.statusText}`,
            }
        }

        const data = await response.text()
        return { success: true, data }
    } catch (error) {
        return { success: false, error: 'Network error' }
    }
}

export async function saveWinner(
    eventName: string,
    playerId: number,
): Promise<Response> {
    try {
        const payload = {
            eventName: eventName,
            playerId: playerId !== undefined ? playerId : null,
        }

        const response = await fetch(`${BASE_URL}/save-winner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        return response
    } catch (error) {
        console.error('Error creating new event:', error)
        return new Response(
            JSON.stringify({
                error: 'Network error',
                message: 'Internal server error',
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
    }
}
