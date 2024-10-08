'use client'
import { deleteEvent } from '@/lib/api/eventApi'
import { useInactiveStopPlaces } from '@/lib/hooks/useInactiveStopPlaceName'
import { BannerAlertBox } from '@entur/alert'
import { Button } from '@entur/button'
import { DeleteIcon } from '@entur/icons'
import { BaseCard } from '@entur/layout'
import { Modal } from '@entur/modal'
import { TravelHeader } from '@entur/travel'
import { Paragraph } from '@entur/typography'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const InactiveEventsList: React.FC = (): JSX.Element => {
    const { events, error } = useInactiveStopPlaces()
    const router = useRouter()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [selectedEventId, setSelectedEventId] = useState<number | undefined>(
        undefined,
    )

    useEffect(() => {
        if (!router) {
            console.error('Router instance not found')
        }
    }, [router])

    if (error) {
        return (
            <BannerAlertBox
                className="w-[640px]"
                title="Feilmelding"
                variant="negative"
            >
                En feil har skjedd ved innlasting av tidligere spill.{' '}
            </BannerAlertBox>
        )
    }

    if (events.length === 0) {
        return (
            <BannerAlertBox
                className="w-[640px]"
                title="Du har ingen tidligere spill"
                variant="information"
            >
                Når du avslutter aktive spill havner de her
            </BannerAlertBox>
        )
    }

    const handleNavigateLeaderboard = (eventId: number | undefined) => {
        if (router && eventId !== undefined) {
            router.push(`/admin/leaderboard/${eventId}`)
        }
    }
    const handleDelete = async () => {
        if (selectedEventId !== undefined) {
            await deleteEvent(selectedEventId)
        }
        setOpen(false)
        window.location.reload()
    }

    const openModal = (eventId: number) => {
        setSelectedEventId(eventId)
        setOpen(true)
    }

    return (
        <div>
            {events.map((event) => (
                <div
                    key={event.eventId}
                    className="flex pb-4 gap-4 align-baseline"
                >
                    <BaseCard
                        key={event.eventId}
                        className="mb-4 max-h-20 flex-1 min-w-[200px] max-w-[480px] h-[80px] p-4 cursor-pointer hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
                        onClick={() => handleNavigateLeaderboard(event.eventId)}
                    >
                        <TravelHeader
                            className="max-w-full"
                            size="large"
                            from={event.startLocationName}
                            to={event.endLocationNames[0] || ''}
                            noWrap={true}
                        />
                    </BaseCard>
                    <Modal
                        open={isOpen}
                        onDismiss={() => setOpen(false)}
                        title="Slette spill?"
                        size="medium"
                    >
                        <Paragraph>
                            Du er i ferd med å avslutte et spill, er du sikker
                            på dette?
                        </Paragraph>
                        <div className="flex gap-6">
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Lukk
                            </Button>
                            <Button
                                variant="negative"
                                onClick={() => handleDelete()}
                            >
                                <DeleteIcon className="inline align-baseline" />
                                Slett spill
                            </Button>
                        </div>
                    </Modal>
                    <div className="flex flex-col justify-center items-center">
                        <Button
                            variant="negative"
                            size="small"
                            onClick={() =>
                                event.eventId !== undefined &&
                                openModal(event.eventId)
                            }
                        >
                            <DeleteIcon className="inline align-baseline" />
                            Slett spill
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InactiveEventsList
