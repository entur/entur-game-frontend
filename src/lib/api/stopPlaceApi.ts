import { StopPlace } from '../types/types'

const query = `
    query ($id: String!) {
        stopPlace(
            id: $id
        ) {
            name
            latitude
        	longitude	
        }
}
`

export async function fetchStopPlace(
    stopPlaceId: string,
): Promise<{ name: string; latitude: number; longitude: number } | null> {
    try {
        const response = await fetch(
            'https://api.entur.io/journey-planner/v3/graphql',
            {
                method: 'POST',
                headers: {
                    'ET-Client-Name': 'enturspillet',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables: { id: stopPlaceId } }),
            },
        )

        const data = await response.json()

        if (data.errors) {
            console.error('Error fetching stop place:', data.errors)
            return null
        }

        const stopPlace = data.data.stopPlace
        if (!stopPlace) {
            console.error('Stop place not found')
            return null
        }

        const { name, latitude, longitude } = stopPlace
        return { name, latitude, longitude }
    } catch (error) {
        console.error('Error fetching stop place:', error)
        return null
    }
}

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
        const ids = data.map((child) => child.id)
        return ids
    } catch (error) {
        console.error('Error fetching stop place children:', error)
        return null
    }
}
