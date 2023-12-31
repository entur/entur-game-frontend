import { StopPlace } from '@entur/sdk'

export type Level = {
    id: string
    name: string
    description: string
    start: StopPlace
    targets: StopPlace[]
    difficulty: 'Lett' | 'Middels' | 'Vanskelig' | 'Event'
    optimalRoute: number
    optimalTraveltime: string
}

export const EASY: Level[] = [
    {
        id: 'DnVuK',
        name: 'Oslo – Trondheim',
        description: 'En reise mellom to av Norges største byer.',
        start: {
            id: 'NSR:StopPlace:58366',
            name: 'Jernbanetorget, Oslo',
            latitude: 59.911898,
            longitude: 10.75038,
        },
        targets: [
            {
                id: 'NSR:StopPlace:59977',
                name: 'Trondheim S, Trondheim',
            },
            {
                id: 'NSR:StopPlace:661',
                name: 'Trondheim S, Trondheim',
            },
            {
                id: 'NSR:StopPlace:659',
                name: 'Trondheim S, Trondheim',
            },
            {
                id: 'NSR:StopPlace:41742',
                name: 'Trondheim S, Trondheim',
            },
        ],
        difficulty: 'Lett',
        optimalRoute: 2,
        optimalTraveltime: '7 timer, 42 minutter',
    },
]

export const MEDIUM: Level[] = [
    {
        id: 'SrKkB',
        name: 'Mandal - Sjusjøen',
        description: 'Fra Mandal Sentrum i til Sjusjøen Sentrum.',
        start: {
            id: 'NSR:StopPlace:22329',
            name: 'Mandal Sentrum',
            latitude: 58.028973,
            longitude: 7.460195,
        },
        targets: [
            {
                id: 'NSR:StopPlace:9625',
                name: 'Sjusjøen Sentrum',
            },
        ],
        difficulty: 'Middels',
        optimalRoute: 6,
        optimalTraveltime: '16 timer, 3 minutter',
    },
]

export const HARD: Level[] = [
    {
        id: 'x8iaz',
        name: 'Halden - Harstad',
        description: 'Fra Halden til Harstad',
        start: {
            id: 'NSR:StopPlace:60053',
            name: 'Halden',
            latitude: 59.120252,
            longitude: 11.384361,
        },
        targets: [
            {
                id: 'NSR:StopPlace:52142',
                name: 'Harstad Byterminal',
            },
            {
                id: 'NSR:StopPlace:198',
                name: 'Halden Stasjon',
            },
            {
                id: 'NSR:StopPlace:192',
                name: 'Halden Stasjon',
            },
        ],
        difficulty: 'Vanskelig',
        optimalRoute: 7,
        optimalTraveltime: '34 timer, 10 minutter',
    },
]

export const EVENT: Level[] = [
    {
        id: 'j54ls',
        name: 'Hokksund - Alna senter',
        description: 'Fra Hokksund til Alna senter',
        start: {
            id: 'NSR:StopPlace:58834',
            name: 'Hokksund',
            latitude: 59.767177,
            longitude: 9.91113,
        },
        targets: [
            {
                id: 'NSR:StopPlace:6237',
                name: 'Alna senter',
            },
        ],
        difficulty: 'Event',
        optimalRoute: 7,
        optimalTraveltime: '2 timer, 7 minutter',
    },
    {
        id: 'k2s21',
        name: 'Ski stasjon - Alexander Kiellands plass, Oslo',
        description: 'Fra Ski stasjon til Alexander Kiellands plass, Oslo',
        start: {
            id: 'NSR:StopPlace:60944',
            name: 'Ski stasjon',
            latitude: 59.7191,
            longitude: 10.8355,
        },
        targets: [
            {
                id: 'NSR:StopPlace:6288',
                name: 'Alexander Kiellands plass',
            },
        ],
        difficulty: 'Event',
        optimalRoute: 12,
        optimalTraveltime: '123 timer, 12 minutter',
    },
]

export const ALL_LEVELS = [...EASY, ...MEDIUM, ...HARD, ...EVENT]
