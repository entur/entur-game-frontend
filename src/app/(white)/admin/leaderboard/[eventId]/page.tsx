import { getScoresByEventId } from '@/lib/api/scoreApi'
import PreviousLeaderboard from './Leaderboard'
import { getEventById } from '@/lib/api/eventApi'

export default async function LeaderboardPage({
    params,
}: {
    params: { eventId: number }
}) {
    const scores = await getScoresByEventId(params.eventId)
    const event = await getEventById(params.eventId)
    return (
        <PreviousLeaderboard
            scores={scores}
            eventName={event.data?.eventName ?? 'Event name undefined'}
            eventId={params.eventId}
        />
    )
}
