import { PlayerScore, Score } from '@/lib/types/types'

export const calculateRank = (
    currentPage: number,
    results: number,
    array: PlayerScore[],
    index: number,
    score: Score,
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
