import { StopPlace } from '../types/types'

export async function fetchStopPlaceChildren(
    stopPlaceId: string,
): Promise<string[] | null> {
    try {
        const response = await fetch(
            `https://api.entur.io/stop-places/v1/read/stop-places/${stopPlaceId}/children`,
        )

        if (!response.ok) {
            throw new Error(
                `Failed to fetch data. Status code: ${response.status}`,
            )
        }

        const data: StopPlace[] = await response.json()
        console.log(data)
        const ids = data.map((child) => child.id)
        return ids
    } catch (error) {
        console.error('Error fetching stop place children:', error)
        return null
    }
}
