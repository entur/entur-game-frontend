export type Event = {
    eventId: number;
    eventName: string;
    startLocationId: StopPlace[];
    endLocationId: StopPlace[];
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

export type Score = {
    scoreId: number;
    scoreValue: number;
    player?: Player;
    event?: Event;
}