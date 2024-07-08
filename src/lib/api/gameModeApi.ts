import { Level } from '@/lib/constants/levels'

const baseUrl = 'http://localhost:8080'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/plain; charset=UTF-8')

export async function getAllGameMode(): Promise<Level[]> {
    const response = await fetch(`${baseUrl}/game-mode`)
    return response.json()
}
export async function getActiveGameModeEvent(): Promise<Level | null> {
    const response = await fetch(`${baseUrl}/game-mode/active-event`)
    if (response.status !== 200) return null
    return response.json()
}

export async function updateActiveGameModeEvent(
    difficulty: string,
): Promise<Level> {
    const response = await fetch(
        `${baseUrl}/game-mode/active-event/${difficulty}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        },
    )
    return response.json()
}