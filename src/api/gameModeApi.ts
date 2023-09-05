import { Level } from '../constant/levels'

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:8080'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/plain; charset=UTF-8')

export async function getOptimalRouteText(difficulty: string): Promise<string> {
    const response = await fetch(
        `${baseUrl}/game-mode/optimal-route/${difficulty}`,
        { headers: myHeaders },
    )
    return response.text()
}

export async function getGameMode(difficulty: string): Promise<Level | null> {
    const response = await fetch(`${baseUrl}/game-mode/${difficulty}`)
    if (response.status !== 200) return null
    return response.json()
}
