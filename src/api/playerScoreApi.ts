const baseUrl = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:8080'

export interface Destination {
    id: string
    destination: string
}

export interface PlayerResponse {
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

export async function getTopTenByDifficulty(
    difficulty: string,
): Promise<PlayerResponse[]> {
    const response = await fetch(
        `${baseUrl}/player-score?difficulty=${difficulty}`,
    )
    return await response.json()
}

export async function getByDifficulty(
    difficulty: string,
    size?: number,
): Promise<PlayerResponse[]> {
    const response = await fetch(
        `${baseUrl}/player-score?difficulty=${difficulty}&size=${size ?? 20}`,
    )
    return await response.json()
}

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
