import { useEffect, useState } from 'react'
import { BackendEvent } from '../types/types'
import { getInactiveEvents } from '../api/eventApi'
import { fetchStopPlace } from '../api/stopPlaceApi'

interface EventWithStopPlaces extends BackendEvent {
    startLocationName: string | null
    endLocationNames: string[]
}

export const useInactiveStopPlaces = () => {
    const [events, setEvents] = useState<EventWithStopPlaces[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const inactiveEvents = await getInactiveEvents()
                console.log('Inactive events fetched:', inactiveEvents)
                if (!inactiveEvents) {
                    setError('Failed to fetch inactive events')
                    return
                }

                const eventsWithNames = await Promise.all(
                    inactiveEvents.map(async (event) => {
                        const startLocation = await fetchStopPlace(
                            event.startLocationId,
                        )
                        const endLocationIds = [event.endLocationId]
                        const endLocationNames = await Promise.all(
                            endLocationIds.map(async (id) => {
                                const stopPlace = await fetchStopPlace(id)
                                return stopPlace ? stopPlace.name : null
                            }),
                        )

                        return {
                            ...event,
                            startLocationName: startLocation
                                ? startLocation.name
                                : null,
                            endLocationNames: endLocationNames.filter(
                                (name): name is string => name !== null,
                            ),
                        }
                    }),
                )

                setEvents(eventsWithNames)
            } catch (err) {
                console.error('Error fetching events:', err)
                setError('Error fetching events')
            }
        }

        fetchEvents()
    }, [])

    return { events, error, setEvents }
}
