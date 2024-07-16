import { TGeoresponse, TripQueryVariables } from '../types/types'
import { NormalizedDropdownItemType } from '@entur/dropdown'

export async function getTripInfo(
    query: string,
    variables: TripQueryVariables,
) {
    const response = await fetch(
        'https://api.entur.io/journey-planner/v3/graphql',
        {
            method: 'POST',
            headers: {
                'ET-Client-Name': 'enturspillet',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        },
    )
    return response.json()
}

export const fetchDropdownItems = async (
    inputValue: string,
): Promise<NormalizedDropdownItemType[]> => {
    try {
        if (inputValue.length < 2) return []
        const response = await fetch(
            `https://api.entur.io/geocoder/v1/autocomplete?text=${inputValue}&size=20&lang=no&layers=venue`,
        )
        const data: TGeoresponse = await response.json()
        const mappedData = data.features.map((feature) => {
            const { id, label } = feature.properties || {}
            return {
                label: label ?? '',
                value: id ?? '',
            }
        })
        return mappedData
    } catch (error) {
        if (error === 'AbortError') throw error
        console.error('Error fetching data:', error)
        return []
    }
}
