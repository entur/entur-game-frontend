import { format, formatDuration, parseISO } from 'date-fns'
import { intervalToDuration } from 'date-fns'
import { nb } from 'date-fns/locale'
import { ZonedDateTime } from '@internationalized/date'

function pad(number: number, length: number): string {
    return number.toString().padStart(length, '0')
}

export function formatTimePlanner(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    return date.toLocaleTimeString('nb-NO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
}

export function formatPlannerDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} t ${minutes} min`
}

export function formatDateTime(
    dateObj: ZonedDateTime,
    timeObj: ZonedDateTime,
): string {
    const year = dateObj.year
    const month = pad(dateObj.month, 2)
    const day = pad(dateObj.day, 2)

    const hour = pad(timeObj.hour, 2)
    const minute = pad(timeObj.minute, 2)
    const second = pad(timeObj.second, 2)

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`

    return formattedDate
}

export function formatInterval(currentTime: Date, startTime: Date): string {
    return (
        formatDuration(
            intervalToDuration({ end: currentTime, start: startTime }),
            { locale: nb, delimiter: ', ' },
        ) || '0 minutter'
    )
}

export function formatMilliseconds(milliseconds: number) {
    const totalSeconds = Math.ceil(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const hoursString =
        hours === 0 ? '' : hours === 1 ? '1 time' : hours + ' timer'
    const minutesString =
        minutes === 0 && hours === 0
            ? ''
            : minutes === 1
              ? '1 minutt'
              : minutes + ' minutter'
    const secondsString = seconds === 1 ? '1 sekund' : seconds + ' sekunder'

    return `${hoursString} ${minutesString} ${secondsString}`.trim()
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
    const minute = date.getMinutes().toString().padStart(2, '0')
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
