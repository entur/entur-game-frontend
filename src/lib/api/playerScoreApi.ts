import { PlayerScore } from '@/lib/types/types'

const baseUrl = 'http://localhost:8080'

export interface Destination {
    id: string
    destination: string
}

export interface PlayerResponse {
    rank?: number
    name: string
    email: string
    phoneNumber: number
    difficulty: 'Lett' | 'Middels' | 'Vanskelig' | 'Event'
    score: number
    totalOptions: number
    totalPlaytime: number
    totalTravelTime: number
    fromDestination: Destination
    toDestination: Destination
}

export type PlayerRequest = Omit<PlayerResponse, 'score'>

export async function savePlayerScore(
    playerInfo: PlayerRequest,
): Promise<Response> {
    const response = await fetch(`${baseUrl}/player-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerInfo),
    })
    return response
}

export async function saveScore(
    playerScore: PlayerScore,
): Promise<Response> {
    const response = await fetch(`${baseUrl}/score/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerScore),
    })
    return response
}

export async function getActiveScores(): Promise<
    PlayerScore[] | null
> {
    const response = await fetch(`${baseUrl}/score/active`)
    if (response.status !== 200) return null
    return await response.json()
}
