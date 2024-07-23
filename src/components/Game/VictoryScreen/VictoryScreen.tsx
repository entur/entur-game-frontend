import React, { ReactElement, useEffect, useState } from 'react'
import { Heading3, Heading5, Label, Paragraph } from '@entur/typography'
import { Checkbox, TextField } from '@entur/form'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import { BackendEvent, Event, Player, PlayerScore } from '@/lib/types/types'
import { saveScore } from '@/lib/api/scoreApi'
import {
    formatIntervalToSeconds,
    formatMilliseconds,
} from '@/lib/utils/dateFnsUtils'
import { Controller, useForm } from 'react-hook-form'
import { createOptimalRouteText } from '@/lib/api/eventApi'
import { useRouter } from 'next/navigation'
import { SmallAlertBox, useToast } from '@entur/alert'
import { Contrast } from '@entur/layout'

type Props = {
    event: Event
    numLegs: number
    currentTime: Date
    startTime: Date
}

type FormValues = {
    name: string
    email: string
    phoneNumber: number
    consent: boolean
}

export function VictoryScreen({
    event,
    numLegs,
    currentTime,
    startTime,
}: Props): ReactElement {
    const { addToast } = useToast()

    const {
        formState: { errors, isLoading, isSubmitting },
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
    } = useForm<FormValues>({
        defaultValues: { name: '', email: '', consent: false },
    })
    const router = useRouter()
    const [isError, setError] = useState<boolean>(false)
    const [responseStatus, setResponseStatus] = useState<number | null>(null)

    const timeDescription = formatMilliseconds(
        currentTime.getTime() - startTime.getTime(),
    )
    const [optimalRouteText, setOptimalRouteText] = useState<string>('')

    async function onSubmit(data: FormValues) {
        const newPlayer: Player = {
            playerName: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
        }

        const backendEvent: BackendEvent = {
            eventId: event.eventId,
            eventName: event.eventName,
            startLocationId: event.startLocation.id,
            endLocationId: event.endLocation[0].id,
            startTime: event.startTime,
            optimalStepNumber: event.optimalStepNumber,
            optimalTravelTime: event.optimalTravelTime,
            isActive: event.isActive,
        }

        const playerScore: PlayerScore = {
            scoreId: null,
            scoreValue:
                100.0 *
                (event.optimalStepNumber / numLegs) *
                (event.optimalTravelTime /
                    formatIntervalToSeconds(currentTime, startTime)),
            totalStepNumber: numLegs,
            totalTravelTime: formatIntervalToSeconds(currentTime, startTime),
            totalPlayTime: 0,
            player: newPlayer,
            event: backendEvent,
        }

        const response = await saveScore(playerScore)
        setError(false)
        if (response.status > 199 && response.status < 299) {
            addToast({
                title: 'Poengsum registrert',
                content: <>Takk for at du spilte!</>,
            })
            setTimeout(() => {
                router.push('/')
            }, 5000)
            return
        }
        if (response.status === 400) {
            addToast({
                title: 'Du slo dessverre ikke din forrige rekord',
                content: <>Prøv gjerne igjen!</>,
            })
            setTimeout(() => {
                router.push('/')
            }, 5000)
            return
        }
        setResponseStatus(response.status)
        setError(true)
    }

    useEffect(() => {
        async function getOptimalRouteText(): Promise<void> {
            const data = await createOptimalRouteText(event)
            setOptimalRouteText(data)
        }
        getOptimalRouteText()
        window.scroll(0, 0)
    }, [])

    return (
        <Contrast>
            <div className="min-h-screen min-w-screen">
                <div className="flex justify-center">
                    <form
                        className="flex flex-col max-w-3xl mt-20 pr-4 pl-4 gap-6"
                        onSubmit={handleSubmit(async (data) => {
                            await onSubmit(data)
                        })}
                    >
                        <Heading3 className="font-semibold">
                            Du er fremme!
                        </Heading3>
                        <Paragraph>
                            {`Du kom deg fra ${event.startLocation.name} til ${event.endLocation[0].name} på ${numLegs} etapper og ${timeDescription}`}
                            <br />
                            <br />
                            {optimalRouteText}
                        </Paragraph>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: 'Dette feltet er påkrevet.',
                                maxLength: {
                                    value: 50,
                                    message: 'Maks 50 tegn.',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Navn"
                                    placeholder=""
                                    {...field}
                                    variant={
                                        fieldState.error ? 'error' : 'info'
                                    }
                                    feedback={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Dette feltet er påkrevet.',
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Ugyldig e-postadresse.',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="E-postadresse"
                                    placeholder=""
                                    {...field}
                                    variant={
                                        fieldState.error ? 'error' : 'info'
                                    }
                                    feedback={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                required: 'Dette feltet er påkrevet.',
                                pattern: {
                                    value: /^[0-9]{8}$/g,
                                    message:
                                        'Ugyldig mobilnummer. Den må være 8 siffer.',
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Mobilnummer"
                                    placeholder=""
                                    {...field}
                                    type="number"
                                    variant={
                                        fieldState.error ? 'error' : 'info'
                                    }
                                    feedback={fieldState.error?.message}
                                />
                            )}
                        />
                        <div
                            className={`border-2 ${
                                errors.consent
                                    ? 'border-coral'
                                    : 'border-blue-60'
                            } rounded border-solid w-full h-28 cursor-pointer`}
                            {...register('consent', { required: true })}
                            onClick={() =>
                                setValue('consent', !getValues('consent'))
                            }
                        >
                            <div className="grid grid-cols-8 grid-row-2 pt-4 pl-4 pb-4">
                                <Heading5
                                    className="font-semibold col-span-7 cursor-pointer select-none"
                                    margin="none"
                                >
                                    Samtykke
                                </Heading5>
                                <Checkbox
                                    className="sm:place-self-end sm:row-span-1 m-0 mr-0 row-span-2 place-self-center"
                                    {...register('consent', { required: true })}
                                    onClick={() =>
                                        setValue(
                                            'consent',
                                            !getValues('consent'),
                                        )
                                    }
                                />
                                <Label className=" col-span-5 cursor-pointer select-none">
                                    Jeg samtykker til at Entur kan kontakte meg
                                    på e-post i forbindelse med konkurransen.
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-row mt-4 gap-4">
                            <SecondaryButton
                                loading={isSubmitting || isLoading}
                                onClick={() => router.push('/')}
                            >
                                Avbryt
                            </SecondaryButton>
                            <PrimaryButton
                                loading={isSubmitting || isLoading}
                                type="submit"
                            >
                                Lagre poengsum
                            </PrimaryButton>
                        </div>
                        {isError && (
                            <SmallAlertBox
                                variant="negative"
                                width="fit-content"
                            >
                                Noe gikk galt:{' '}
                                {responseStatus === 404
                                    ? 'Event (spill) ble ikke funnet. Tilkall hjelp.'
                                    : responseStatus === 409
                                      ? 'Spiller med samme brukernavn eksisterer allerede. Bytt navn.'
                                      : 'Ukjent feil oppdaget. Tillkall hjelp.'}
                            </SmallAlertBox>
                        )}
                    </form>
                </div>
            </div>
        </Contrast>
    )
}
