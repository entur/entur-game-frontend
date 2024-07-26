import { useState, useEffect } from 'react'
import { getActiveScores } from '@/lib/api/scoreApi'
import { PlayerScore } from '@/lib/types/types'

type UseScoresReturnType = {
    scores: PlayerScore[]
    leader: PlayerScore | null
    showAlert: boolean
    setShowAlert: (show: boolean) => void
}

const useScores = (): UseScoresReturnType => {
    const [scores, setScores] = useState<PlayerScore[]>([])
    const [leader, setLeader] = useState<PlayerScore | null>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false)

    useEffect(() => {
        const getScores = async () => {
            const scores = await getActiveScores()
            if (scores && scores.length > 0) {
                const sortedScores = scores.sort(
                    (a, b) =>
                        b.scoreValue - a.scoreValue ||
                        -(a.totalStepNumber - b.totalStepNumber),
                )
                setScores(sortedScores)

                const highestScore = sortedScores[0].scoreValue
                const topScorers = sortedScores.filter(
                    (score) => score.scoreValue === highestScore,
                )
                const randomLeader =
                    topScorers[Math.floor(Math.random() * topScorers.length)]

                setLeader(randomLeader)
                setShowAlert(false)
            }
        }
        getScores()
    }, [])

    return { scores, leader, showAlert, setShowAlert }
}

export default useScores
