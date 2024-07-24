import { useEffect, useState } from 'react'

type Props = {
    maxTime: number
    usedTime: number
}

const CountdownBar = ({ maxTime, usedTime }: Props) => {
    const [progress, setProgress] = useState(
        Math.max(0, Math.ceil(((maxTime - usedTime) / maxTime) * 100)),
    )

    useEffect(() => {
        setProgress(
            Math.max(0, Math.ceil(((maxTime - usedTime) / maxTime) * 100)),
        )
    }, [maxTime, usedTime])

    const getProgressBarColor = (progress: number) => {
        if (progress > 67) {
            return 'bg-mint-contrast'
        } else if (progress > 33) {
            return 'bg-canary-contrast'
        } else {
            return 'bg-lava-contrast'
        }
    }

    return (
        <div className="w-full bg-gray-300 p-1 rounded border border-white">
            <div
                className={`${getProgressBarColor(progress)} h-3 `}
                style={{
                    width: `${progress}%`,
                }}
            ></div>
        </div>
    )
}

export default CountdownBar
