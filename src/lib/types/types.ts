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
