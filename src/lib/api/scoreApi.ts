import { PlayerScore } from '@/lib/types/types'
import { baseUrl } from '@/config'

export async function saveScore(playerScore: PlayerScore): Promise<Response> {
    const response = await fetch(`${baseUrl}/score/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerScore),
    })
    return response
}

export async function getActiveScores(): Promise<PlayerScore[] | null> {
    const response = await fetch(`${baseUrl}/score/active`)
    if (response.status !== 200) return null
    return await response.json()
}

export async function getScoresEventId(
    eventId: number,
): Promise<PlayerScore[] | null> {
    const response = await fetch(`${baseUrl}/score/event/${eventId}`)
    if (response.status !== 200) return null
    return await response.json()
}
