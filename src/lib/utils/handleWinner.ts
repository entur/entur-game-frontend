import { saveWinner, endActiveEvent } from '@/lib/api/eventApi'
import { PlayerScore } from '../types/types'

export const handleDrawWinnerAndEndGame = async (
    scores: PlayerScore[],
    setShowAlert: (show: boolean) => void,
    eventName: string | null,
    leader: PlayerScore | null,
    setSaveWinnerError: (error: boolean) => void,
    setWinnerEndOpen: (open: boolean) => void,
    setModalOpen: (open: boolean) => void,
) => {
    if (scores.length === 0) {
        setShowAlert(true)
        return
    }

    setWinnerEndOpen(false)
    setModalOpen(true)

    if (!eventName || !leader?.player?.playerId) {
        setSaveWinnerError(true)
        return
    }

    const response = await saveWinner(eventName, leader.player.playerId)
    setSaveWinnerError(response.status !== 200)

    await endActiveEvent()
}

export const handleDismiss = (
    setModalOpen: (open: boolean) => void,
    setEventNameError: (error: boolean) => void,
) => {
    setModalOpen(false)
    setEventNameError(true)
    window.location.reload()
}
export function calculateWinner(scores: PlayerScore[]) {
    const sortedScores = scores.sort(
        (a, b) =>
            b.scoreValue - a.scoreValue ||
            -(a.totalStepNumber - b.totalStepNumber),
    )

    const highestScore = sortedScores[0].scoreValue
    const topScorers = sortedScores.filter(
        (score) => score.scoreValue === highestScore,
    )
    return topScorers[Math.floor(Math.random() * topScorers.length)]
}
