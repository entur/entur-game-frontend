import { PlayerScore } from '@/lib/types/types'
import { BASE_URL } from '@/constants'

export async function saveScore(playerScore: PlayerScore): Promise<Response> {
    const response = await fetch(`${BASE_URL}/score/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerScore),
    })
    return response
}

export async function getActiveScores(): Promise<PlayerScore[] | null> {
    const response = await fetch(`${BASE_URL}/score/active`)
    if (response.status !== 200) return null
    return await response.json()
}

export async function getScoresByEventId(eventId: number) {
    try {
        const response = await fetch(`${BASE_URL}/score/event/${eventId}`)
        if (response.status !== 200) {
            console.error('Network response not okay')
        }
        const data: PlayerScore[] = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching scores by event ID:', error)
        return []
    }
}
