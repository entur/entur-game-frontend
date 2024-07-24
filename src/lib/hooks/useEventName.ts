import { useEffect, useState } from 'react'
import { getActiveEvent } from '@/lib/api/eventApi'

export const useEventName = () => {
    const [eventName, setEventName] = useState<string | null>(null)
    const [isEventNameError, setEventNameError] = useState<boolean>(false)

    useEffect(() => {
        const getEventName = async () => {
            const event = await getActiveEvent()
            if (event) {
                setEventName(event.eventName)
                setEventNameError(false)
            } else {
                setEventNameError(true)
            }
        }
        getEventName()
    }, [])

    return { eventName, isEventNameError, setEventNameError }
}
