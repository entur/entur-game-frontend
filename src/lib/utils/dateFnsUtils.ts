import { format, formatDuration, parseISO } from 'date-fns'
import { intervalToDuration } from 'date-fns'
import { nb } from 'date-fns/locale'

export function formatInterval(currentTime: Date, startTime: Date): string {
    return (
        formatDuration(
            intervalToDuration({ end: currentTime, start: startTime }),
            { locale: nb, delimiter: ', ' },
        ) || '0 minutter'
    )
}

export function formatMilliseconds(milliseconds: number) {
    let totalSeconds = Math.ceil(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${hours} timer ${minutes} minutter ${seconds} sekunder`;
}

export function formatIntervalToSeconds(
    currentTime: Date,
    startTime: Date,
): number {
    return Math.round((currentTime.getTime() - startTime.getTime()) / 1000)
}

export function formatTime(value: Date | string): string {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'HH:mm', { locale: nb })
}

export function formatDate(date: Date): string {
    const weekdays = [
        'Søndag',
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
        'Lørdag',
    ]
    const months = [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    const dayOfWeek = weekdays[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${dayOfWeek} ${dayOfMonth}. ${month} kl. ${hour}:${minute}`
}

export function formatDateAndTime(value: Date | string): string {
    const date = typeof value === 'string' ? parseISO(value) : value
    const custom_days = [
        'Søndag',
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
        'Lørdag',
    ]
    const custom_months = [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    return (
        custom_days[date.getDay()] +
        ' ' +
        date.getDate() +
        '. ' +
        custom_months[date.getMonth()] +
        ' ' +
        date.getFullYear() +
        ' kl. ' +
        date.toLocaleTimeString()
    )

    //return format(date, "cccc eo MMMM 'kl.' HH:mm", { locale: nb }) Removed to get all days in a month to be displayed
}
