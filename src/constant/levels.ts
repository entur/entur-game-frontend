import { StopPlace } from '@entur/sdk'

export type Level = {
    id: string
    name: string
    description: string
    start: StopPlace
    targets: StopPlace[]
    difficulty: 'Lett' | 'Middels' | 'Vanskelig'
    optimalRoute: number
    optimalTraveltime: string
}

export const EASY: Level[] = [
    {
        id: 'DnVuK',
        name: 'Oslo – Trondheim',
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
        name: 'Florø - Halden',
        description: 'Fra Florø Terminalen til Halden Stasjon',
        start: {
            id: 'NSR:StopPlace:58182',
            name: 'Florø terminal',
            latitude: 61.601616,
            longitude: 5.02853,
        },
        targets: [
            {
                id: 'NSR:StopPlace:60053',
                name: 'Halden Stasjon',
            },
        ],
        difficulty: 'Vanskelig',
        optimalRoute: 7,
        optimalTraveltime: '34 timer, 10 minutter',
    },
]

export const ALL_LEVELS = [...EASY, ...MEDIUM, ...HARD]