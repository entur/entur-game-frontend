const baseUrl = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:8080'

export interface Destination {
    id: string
    destination: string
}

export interface PlayerResponse {
    nickname: string
    difficulty: 'Lett' | 'Middels' | 'Vanskelig'
    score: number
    totalOptions: number
    totalPlaytime: number
    totalTravelTime: number
    fromDestination: Destination
    toDestination: Destination
}

export type PlayerRequest = Omit<PlayerResponse, 'score'>

export async function getPlayerScoreTopTenOverall(): Promise<PlayerResponse[]> {
    const response = await fetch(`${baseUrl}/player-score/top-ten-overall`)
    return await response.json()
}

export async function savePlayerScore(
    playerInfo: PlayerRequest,
): Promise<void> {
    await fetch(`${baseUrl}/player-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerInfo),
    })
}
