import { Level } from '../constant/levels'
import { BackendEvent, Event } from '@/types/types'
import mockStopPlace from '../mock-api/stopPlace'
import { StopPlace } from '@entur/sdk/lib/fields/StopPlace'

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:8080'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/plain; charset=UTF-8')

export async function getGameModeByDifficulty(difficulty: string): Promise<Level | null> {
    const response = await fetch(`${baseUrl}/game-mode/${difficulty}`)
    if (response.status !== 200) return null
    return response.json()
}

export async function getAllGameMode(): Promise<Level[]> {
    const response = await fetch(`${baseUrl}/game-mode`)
    return response.json()
}
export async function getActiveGameModeEvent(): Promise<Level | null> {
    const response = await fetch(`${baseUrl}/game-mode/active-event`)
    if (response.status !== 200) return null
    return response.json()
}

export async function updateActiveGameModeEvent(
    difficulty: string,
): Promise<Level> {
    const response = await fetch(
        `${baseUrl}/game-mode/active-event/${difficulty}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Auth: import.meta.env.VITE_APP_SECRET,
            },
            body: JSON.stringify({}),
        },
    )
    return response.json()
}

export async function createOptimalRouteText(event: Event): Promise<string> {
    const totalSeconds = event?.optimalTravelTime;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `Vår reiseplanlegger har beregnet en optimal rute der antall etapper er ${event?.optimalStepNumber} og reisetid er ${hours} timer, ${minutes} minutter og ${seconds} sekunder.`;
}

export async function getBackendEventByEventName(eventName: string): Promise<BackendEvent | null> {
    const response = await fetch(`${baseUrl}/event/${eventName}`)
    if (response.status !== 200) return null
    return response.json()
}

function findStopPlaceById(id: string): StopPlace | undefined {
    return mockStopPlace.find(stopPlace => stopPlace.id === id)
}

export async function getEventByEventName(eventName: string): Promise<Event | null> {
    const baseEvent = await getBackendEventByEventName(eventName)
    if (!baseEvent) return null

    const startLocation = findStopPlaceById(baseEvent.startLocationId)
    const endLocation = [findStopPlaceById(baseEvent.endLocationId)]

    if (!startLocation || endLocation.length === 0) {
        return null
    }

    if (typeof startLocation === 'undefined' || typeof endLocation[0] === 'undefined') {
        return null;
    }

    return {
        eventId: baseEvent.eventId,
        eventName: baseEvent.eventName,
        startLocation: startLocation,
        endLocation: endLocation,
        startTime: baseEvent.startTime,
        optimalStepNumber: baseEvent.optimalStepNumber,
        optimalTravelTime: baseEvent.optimalTravelTime,
        isActive: baseEvent.isActive
    } as Event
}