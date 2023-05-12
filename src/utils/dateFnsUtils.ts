import { format, formatDuration, parseISO } from 'date-fns'
import { intervalToDuration } from 'date-fns/esm'
import { nb } from 'date-fns/locale'

export function formatInterval(currentTime: Date, startTime: Date): string {
    return (
        formatDuration(
            intervalToDuration({ end: currentTime, start: startTime }),
            { locale: nb, delimiter: ', ' },
        ) || '0 minutter'
    )
}

export function formatTimeForEndOfGame(currentTime: Date, startTime: Date): string{
    const totalSecondsPlayed =  (currentTime.getTime() - startTime.getTime()) / 1000
    const hours = Math.round(totalSecondsPlayed/3600)
    const minutes = Math.round((totalSecondsPlayed % 3600) / 60)
    const seconds = Math.round(totalSecondsPlayed % 60)
    return hours.toString() + ' timer ' + minutes.toString() + ' minutter ' + seconds.toString() + ' sekunder'
}

export function formatIntervalToSeconds(
    currentTime: Date,
    startTime: Date,
): number {
    const totalSecondsPlayed =  Math.round((currentTime.getTime() - startTime.getTime()) / 1000)
    return totalSecondsPlayed
}

export function formatTime(value: Date | string): string {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'HH:mm', { locale: nb })
}

export function formatDateAndTime(value: Date | string): string {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, "cccc eo MMMM 'kl.' HH:mm", { locale: nb })
}
