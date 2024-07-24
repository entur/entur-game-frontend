import { PlayerScore } from '@/lib/types/types'
import { getActiveScores } from '../api/scoreApi'

export const calculateRank = (
    currentPage: number,
    results: number,
    array: PlayerScore[],
    index: number,
    score: PlayerScore,
): number => {
    return (
        (currentPage - 1) * results +
        array
            .slice(0, index)
            .filter(
                (item: { scoreValue: number }) =>
                    item.scoreValue > score.scoreValue,
            ).length +
        1
    )
}

export async function calculateRankOfScore(
    scoreValue: number,
): Promise<number> {
    const activeScores = await getActiveScores()

    if (activeScores === null) {
        return 1
    }

    const sortedScores = activeScores
        .map((score) => score.scoreValue)
        .sort((a, b) => a - b)

    let rank = 1
    for (let i = 0; i < sortedScores.length; i++) {
        if (sortedScores[i] >= scoreValue) {
            break
        }
        rank++
    }
    return rank
}
