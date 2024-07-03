import { StopPlace } from '@entur/sdk/lib/fields/StopPlace';
import { Event } from '@/types/types';

const mockEvent: Event = {
    eventId: 1,
    eventName: "Javazone 2024",
    startLocation: {
      id: "NSR:StopPlace:58366",
      name: "Jernbanetorget, Oslo",
      latitude: 59.911898,
      longitude: 10.75038,
    } as StopPlace,
    endLocation: [
      {
        id: "NSR:StopPlace:59977",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357, // oppdatert for å reflektere riktig sted
        longitude: 10.3984, // oppdatert for å reflektere riktig sted
      } as StopPlace,
      {
        id: "NSR:StopPlace:661",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357, // bruk samme koordinater for konsistens
        longitude: 10.3984,
      } as StopPlace,
      {
        id: "NSR:StopPlace:659",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357,
        longitude: 10.3984,
      } as StopPlace,
      {
        id: "NSR:StopPlace:41742",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357,
        longitude: 10.3984,
      } as StopPlace
    ],
    startTime: "2024-09-12T08:00:00",
    optimalStepNumber: 2,
    optimalTravelTime: 34020
}

export default mockEvent;
