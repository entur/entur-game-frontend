export type Event = {
    eventId: number;
    eventName: string;
    start: StopPlace;
    targets: StopPlace[];
    startTime: string;
    optimalStepNumber: number;
    optimalTravelTime: number;
}

type StopPlace = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export type Player = {
    playerId: number;
    playerName: string;
    email: string;
    score: number;
    phoneNumber: number;
    totalStepNumber: number;
    totalTravelTime: string;
    totalPlayTime: string;
}

type Score = {
    scoreId: number;
    scoreValue: number;
    player?: Player;
    event?: Event;
}