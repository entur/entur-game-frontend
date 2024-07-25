import { useEffect, useState } from 'react'
import { useEventName } from './useEventName'
import { getEventByEventName } from '../api/eventApi'

export const useStopPlaceName = () => {
    const [startLocationName, setStartLocationName] = useState<string>()
    const [endLocationName, setEndLocationName] = useState<string>()
    const [error, setError] = useState<string | null>(null)
    const { eventName } = useEventName()

    useEffect(() => {
        const fetchLocations = async (eventName: string) => {
            const eventResult = await getEventByEventName(eventName)

            if (!eventResult.success) {
                console.error('Error fetching event:', eventResult.error)
                setError(eventResult.error)
                return
            }

            const event = eventResult.data
            const startLocationName = event.startLocation.name
            const endLocationNames = event.endLocation.map(
                (location) => location.name,
            )

            setStartLocationName(startLocationName)
            setEndLocationName(endLocationNames[0])
        }

        if (eventName) {
            fetchLocations(eventName)
        } else {
            console.error('Error: Event name is null or undefined')
        }
    }, [eventName])

    return { startLocationName, endLocationName, error }
}
