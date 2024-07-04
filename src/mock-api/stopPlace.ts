import { StopPlace } from '@entur/sdk/lib/fields/StopPlace';

const mockStopPlace: StopPlace[] = [
    {
        id: "NSR:StopPlace:58366",
        name: "Jernbanetorget, Oslo",
        latitude: 59.911898,
        longitude: 10.75038,
    },
    {
        id: "NSR:StopPlace:59977",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357, // oppdatert for å reflektere riktig sted
        longitude: 10.3984, // oppdatert for å reflektere riktig sted
    },
    {
        id: "NSR:StopPlace:661",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357, // bruk samme koordinater for konsistens
        longitude: 10.3984,
    },
    {
        id: "NSR:StopPlace:659",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357,
        longitude: 10.3984,
    },
    {
        id: "NSR:StopPlace:41742",
        name: "Trondheim S, Trondheim",
        latitude: 63.4357,
        longitude: 10.3984,
    },
    {
        id: "NSR:StopPlace:198",
        name: "Harstad Stasjon",
        latitude: 59.120252,
        longitude: 11.384361,
    },
    {
        id: "NSR:StopPlace:22329",
        name: "Mandal Sentrum",
        latitude: 58.028973,
        longitude: 7.460195,
    },
    {
        id: "NSR:StopPlace:9625",
        name: "Sjusjøen Sentrum",
        latitude: 59.120252,
        longitude: 11.384361,
    },
];

export default mockStopPlace;
