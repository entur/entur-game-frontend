import { useEffect, useState } from 'react'
import { getTripLocations } from '@/lib/api/eventApi'
import { useEventName } from './useEventName'

export const useStopPlaceNames = () => {
    const [startLocationName, setStartLocationName] = useState<string | null>(
        null,
    )
    const [endLocationName, setEndLocationName] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { eventName } = useEventName()

    useEffect(() => {
        const fetchLocations = async (eventName: string) => {
            const result = await getTripLocations(eventName)
            if (result.success) {
                setStartLocationName(result.data.startLocationName)
                setEndLocationName(result.data.endLocationNames[0])
            } else {
                console.error('Error fetching locations:', result.error)
                setError(result.error)
            }
        }

        if (eventName) {
            fetchLocations(eventName)
        } else {
            return console.error('error:', error)
        }
    }, [eventName])

    return { startLocationName, endLocationName }
}
