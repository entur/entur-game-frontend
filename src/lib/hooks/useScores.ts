import { useEffect, useState } from 'react'
import { getActiveScores } from '@/lib/api/scoreApi'
import { PlayerScore } from '@/lib/types/types'

interface UseScoresReturnType {
    scores: PlayerScore[]
    leader: PlayerScore | null
    showAlert: boolean
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
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
                        a.totalTravelTime - b.totalTravelTime,
                )
                setScores(sortedScores)
                setLeader(sortedScores[0])
                setShowAlert(false)
            }
        }
        getScores()
    }, [])

    return { scores, leader, showAlert, setShowAlert }
}

export default useScores
