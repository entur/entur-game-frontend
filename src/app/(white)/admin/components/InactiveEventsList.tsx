'use client'
import { deleteEvent } from '@/lib/api/eventApi'
import { useInactiveStopPlaces } from '@/lib/hooks/useInactiveStopPlaceName'
import { Button } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { BaseCard } from '@entur/layout'
import { TravelHeader } from '@entur/travel'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const InactiveEventsList: React.FC = (): JSX.Element => {
    const { events, error } = useInactiveStopPlaces()
    const router = useRouter()

    useEffect(() => {
        if (!router) {
            console.error('Router instance not found')
        }
    }, [router])

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleNavigateLeaderboard = (eventId: number | undefined) => {
        if (router && eventId !== undefined) {
            router.push(`/admin/leaderboard/${eventId}`)
        }
    }

    const handleDelete = async (eventId: number | undefined) => {
        if (eventId !== undefined) {
            const result = await deleteEvent(eventId)
            if (result.success) {
                events.map((event) => event.eventId !== eventId)
            }
        }
    }

    return (
        <div>
            {events.map((event) => (
                <div
                    key={event.eventId}
                    className="flex pb-4 gap-4 align-baseline"
                >
                    <BaseCard
                        key={event.eventId}
                        className="mb-4 max-h-20 flex-1 min-w-[200px] max-w-[480px] h-[80px] p-4 cursor-pointer hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
                    >
                        <TravelHeader
                            className="max-w-full"
                            size="large"
                            from={event.startLocationName}
                            to={event.endLocationNames[0] || ''}
                            noWrap={true}
                            onClick={() =>
                                handleNavigateLeaderboard(event.eventId)
                            }
                        />
                    </BaseCard>
                    <div className="flex flex-col justify-center items-center">
                        <Button
                            variant="negative"
                            size="small"
                            onClick={() => handleDelete(event.eventId)}
                        >
                            <DeleteIcon className="inline align-baseline" />
                            Slett spill
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InactiveEventsList
