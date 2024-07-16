const query = `
    query ($id: String!) {
        stopPlace(
            id: $id
        ) {
            name
        }
    }
`

export async function fetchStopPlaceName(
    stopPlaceId: string,
): Promise<string | null> {
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
            console.error('Error fetching stop place name:', data.errors)
            return null
        }
        return data.data.stopPlace.name
    } catch (error) {
        console.error('Error fetching stop place name:', error)
        return null
    }
}
