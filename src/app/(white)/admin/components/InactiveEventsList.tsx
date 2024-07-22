'use client'
import { deleteEvent } from '@/lib/api/eventApi'
import { useInactiveStopPlaces } from '@/lib/hooks/useInactiveStopPlaceName'
import { Button } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { BaseCard } from '@entur/layout'
import { TravelHeader } from '@entur/travel'

const InactiveEventsList: React.FC = (): JSX.Element => {
    const { events, error, setEvents } = useInactiveStopPlaces()

    if (error) {
        return <div>Error: {error}</div>
    }

    // const handleDeleteEvent = async (eventId: number | undefined) => {
    //     try {
    //         await deleteEvent(eventId)
    //         setEvents(events.filter((event) => event.eventId !== eventId)) // Remove deleted event from state
    //     } catch (error) {
    //         console.error('Failed to delete event:', error)
    //     }
    // }

    return (
        <div>
            {events.map((event) => (
                <div className="flex pb-4 gap-4  align-baseline">
                    <BaseCard
                        key={event.eventId}
                        className="mb-4 max-h-20 flex-1 min-w-[200px] max-w-[480px] h-[80px] p-4"
                    >
                        <TravelHeader
                            className="max-w-full"
                            size="large"
                            from={event.startLocationName}
                            to={event.endLocationNames[0] || ''}
                            noWrap={true}
                        />
                    </BaseCard>
                    <Button
                        variant="negative"
                        size="small"
                        // onClick={() => handleDeleteEvent(event.eventId)}
                    >
                        <DeleteIcon className="inline align-baseline" />
                        Slett spill
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default InactiveEventsList
