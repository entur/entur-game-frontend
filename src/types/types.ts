export type Event = {
    eventId: number
    eventName: string
    startLocationId: string
    endLocationId: string
    startTime: string
    optimalStepNumber: number
    optimalTravelTime: number
    isActive: boolean
}

export type Score = {
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
