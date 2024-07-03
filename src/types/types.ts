import { StopPlace } from "@entur/sdk/lib/fields/StopPlace";

export type Event = {
    eventId: number;
    eventName: string;
    startLocation: StopPlace;
    endLocation: StopPlace[];
    startTime: string;
    optimalStepNumber: number;
    optimalTravelTime: number;
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