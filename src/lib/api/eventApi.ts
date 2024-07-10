import { BackendEvent, Event } from '../types/types'
import mockStopPlace from '../mock-api/stopPlace'
import { StopPlace } from '@entur/sdk/lib/fields/StopPlace'
import { useCallback } from 'react'

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


const fetchStopPlaceName = useCallback(async (stopPlaceId: string) => {
    fetch('https://api.entur.io/journey-planner/v3/graphql', {
        method: 'POST',
        headers: {
            'ET-Client-Name': 'enturspillet',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { stopPlaceId } }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.errors) {
                console.error('Error fetching stop place name:', data.errors);
                return null;
            }
            const name = data.data.stopPlace.name;
            console.log('Stop place name:', name);
            return name;
        })
        .catch((error) => console.error('Error fetching stop place name:', error))
}, []);

function findStopPlaceById(id: string): StopPlace | undefined {
    return mockStopPlace.find((stopPlace) => stopPlace.id === id)
}

export async function getEventByEventName(
    eventName: string,
): Promise<Event | null> {
    const baseEvent = await getBackendEventByEventName(eventName)
    if (!baseEvent) return null

    const startLocation = findStopPlaceById(baseEvent.startLocationId)
    const endLocation = [findStopPlaceById(baseEvent.endLocationId)]

    if (!startLocation || endLocation.length === 0) {
        return null
    }

    if (
        typeof startLocation === 'undefined' ||
        typeof endLocation[0] === 'undefined'
    ) {
        return null
    }

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
