import { StopPlace } from '@entur/sdk/lib/fields/StopPlace'

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
    scoreId: number
    scoreValue: number
    totalStepNumber: number
    totalTravelTime: number
    totalPlayTime: number
    player: Player
    event: Event
}

export type Player = {
    playerId: number
    playerName: string
    email: string
    score: number
    phoneNumber: number
    totalStepNumber: number
    totalTravelTime: string
    totalPlayTime: string
}

export type Score = {
    scoreId: number
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
