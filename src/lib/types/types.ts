export type Event = {
    eventId: number
    eventName: string
    startLocation: StopPlace
    endLocation: StopPlace[]
    startTime: string
    optimalStepNumber: number
    optimalTravelTime: number
    isActive: boolean
}

export type BackendEvent = {
    eventId?: number
    eventName: string
    startLocationId: string
    endLocationId: string
    startTime: string
    optimalStepNumber: number
    optimalTravelTime: number
    isActive: boolean
}

export type PlayerScore = {
    scoreId?: number | null
    scoreValue: number
    totalStepNumber: number
    totalTravelTime: number
    totalPlayTime: number
    player: Player
    event: BackendEvent
}

export type Player = {
    playerId?: number
    playerName: string
    email: string
    phoneNumber: number
}

export type Score = {
    scoreId?: number | null
    scoreValue: number
    player?: Player
    event?: Event
}

export type TGeoresponse = {
    features: Array<{
        properties: {
            id?: string
            label?: string
        }
    }>
}

export type StopPlace = {
    id: string
    name: string
    longitude?: number
    latitude?: number
}

export type TripQueryVariables = {
    from: {
        name: string
        place: string
    }
    to: {
        name: string
        place: string
    }
    dateTime: string
    modes: { transportMode: string }[]
}

type Line = {
    id: string
    publicCode: string
}

type Leg = {
    distance: number
    line: Line | null
    mode: 'rail' | 'foot' | 'bus' | 'tram' | 'metro' | 'water'
}

type TripPattern = {
    duration: number
    expectedStartTime: string
    legs: Leg[]
}

export type Trip = {
    tripPatterns: TripPattern[]
}

export type Maybe<T> = T | undefined | null

export function isTripInfoVariables(obj: any): obj is TripQueryVariables {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.from === 'object' &&
        typeof obj.from.name === 'string' &&
        typeof obj.from.place === 'string' &&
        typeof obj.to === 'object' &&
        typeof obj.to.name === 'string' &&
        typeof obj.to.place === 'string' &&
        typeof obj.dateTime === 'string' &&
        Array.isArray(obj.modes) &&
        obj.modes.every((mode: any) => typeof mode.transportMode === 'string')
    )
}

function isLine(obj: any): obj is Line {
    return (
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.publicCode === 'string'
    )
}

function isLeg(obj: any): obj is Leg {
    return (
        typeof obj === 'object' &&
        typeof obj.distance === 'number' &&
        (obj.line === null || isLine(obj.line)) &&
        ['rail', 'foot', 'bus', 'tram', 'metro', 'water'].includes(obj.mode)
    )
}

function isTripPattern(obj: any): obj is TripPattern {
    return (
        typeof obj === 'object' &&
        typeof obj.duration === 'number' &&
        typeof obj.expectedStartTime === 'string' &&
        Array.isArray(obj.legs) &&
        obj.legs.every(isLeg)
    )
}

export function isTrip(obj: any): obj is Trip {
    return (
        typeof obj === 'object' &&
        Array.isArray(obj.tripPatterns) &&
        obj.tripPatterns.every(isTripPattern)
    )
}
