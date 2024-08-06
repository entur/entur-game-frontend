import { StopPlace } from '../types/types'
import { CO2eLeg } from '@/app/providers/CO2Provider'
import { EmissionResponse } from '@/lib/types/emissionsResponse'

export async function getEmissionForCar(
    startLocation: StopPlace,
    endLocation: StopPlace[],
): Promise<EmissionResponse> {
    const response = await fetch('https://emapi.sintef.no/api/v1/energy', {
        method: 'POST',
        headers: {
            AuthKey: 'KEY',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vehicle: 'web:average-private-vehicle-diesel',
            sourceSrid: 4326,
            route: {
                stopIds: [startLocation.id, endLocation[0].id],
            },
        }),
    })

    return await response.json()
}

export async function getEmissionForTrip(
    fullTravel: CO2eLeg[],
): Promise<EmissionResponse> {
    const response = await fetch(
        'https://emapi.sintef.no/api/v1/energy/multi',
        {
            method: 'POST',
            headers: {
                AuthKey: 'KEY',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fullTravel),
        },
    )

    return await response.json()
}
