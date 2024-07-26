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

export async function getScoresEventId(eventId: number) {
    try {
        const response = await fetch(`${baseUrl}/score/event/${eventId}`)
        if (response.status !== 200) {
            throw new Error('Network response not okay')
        }
        const data: PlayerScore[] = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching scores by event ID:', error)
        return []
    }
}
