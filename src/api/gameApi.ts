const baseUrl = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:8080'

export type Player = {
    id: number
    nickname: string
}

export type GameResponse = {
    id: string
    status: 'WAITING_FOR_PLAYERS' | 'STARTED' | 'FINISHED'
    playerList: Player[]
}

export async function getGame(gameId: string): Promise<GameResponse> {
    const response = await fetch(`${baseUrl}/game/${gameId}`)
    return await response.json()
}

export async function createGame(nickname: string): Promise<GameResponse> {
    const response = await fetch(
        `${baseUrl}/game/create/nickname/${nickname}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
    return await response.json()
}

export async function joinGame(
    gameId: string,
    nickname: string,
): Promise<GameResponse> {
    const response = await fetch(
        `${baseUrl}/game/join/${gameId}/nickname/${nickname}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
    return await response.json()
}

export function startGame(gameId: string, gameLevel: string): void {
    fetch(`${baseUrl}/game/start/${gameId}/game-level/${gameLevel}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
