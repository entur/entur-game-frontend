import React, { ReactElement, useState } from 'react'
import { Heading3, Heading5, Label, Paragraph } from '@entur/typography'
import { Checkbox, TextField } from '@entur/form'
import { MenuNavBar } from '../../NavBar/MenuNavBar'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import {
    VictoryArtBoardCircleImage,
    VictoryArtBoardCookieImage,
    VictoryArtBoardOvalImage,
} from './VictoryScreenArt'
import { Level } from '../../../constant/levels'
import { StopPlace } from '@entur/sdk'
import { useNavigate } from 'react-router-dom'
import { savePlayerScore } from '../../../api/playerScoreApi'
import {
    formatIntervalToSeconds,
    formatTimeForEndOfGame,
} from '../../../utils/dateFnsUtils'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    name: string
    level: Level
    target: StopPlace
    setTarget: (target: StopPlace) => void
    numLegs: number
    currentTime: Date
    startTime: Date
    startTimer: number
}

type FormValues = {
    name: string
    email: string
    phoneNumber: number
    consent: boolean
}

export function VictoryScreen({
    name = '',
    level,
    target,
    numLegs,
    currentTime,
    startTime,
    startTimer,
}: Props): ReactElement {
    const {
        formState: { errors, isLoading, isSubmitting, isValid },
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
    } = useForm<FormValues>({
        defaultValues: { name: name, email: '', consent: false },
    })
    const navigate = useNavigate()
    const [isError, setError] = useState<boolean>(false)
    const timeDescription = formatTimeForEndOfGame(
        currentTime,
        startTime,
        level.difficulty,
        numLegs,
    )

    async function onSubmit(data: FormValues) {
        const response = await savePlayerScore({
            ...data,
            difficulty: level.difficulty,
            fromDestination: {
                destination: level.start.name,
                id: level.start.id,
            },
            toDestination: {
                destination: target.name,
                id: target.id,
            },
            totalOptions: numLegs,
            totalPlaytime: Math.trunc((Date.now() - startTimer) / 1000),
            totalTravelTime: formatIntervalToSeconds(currentTime, startTime),
        })
        if (response.status > 199 && response.status < 299) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
            return
        }
        setError(true)
    }

    return (
        <div className="bg-blue-90 min-h-screen min-w-screen">
            <VictoryArtBoardOvalImage className="absolute -top-20 -left-32 hidden xl:block" />
            <VictoryArtBoardCookieImage className="absolute -bottom-28 -left-52  hidden xl:block" />
            <VictoryArtBoardCircleImage className="absolute bottom-60 -right-72 hidden xl:block" />
            <MenuNavBar />
            <div className="flex justify-center">
                {isError && (
                    <Paragraph className="bg-coral">Noe gikk galt.</Paragraph>
                )}
                <form
                    className="flex flex-col max-w-3xl mt-20 pr-4 pl-4 gap-6"
                    onSubmit={handleSubmit(async (data) => {
                        await onSubmit(data)
                    })}
                >
                    <Heading3 className="font-semibold">Du er fremme!</Heading3>
                    <Paragraph>
                        {`Du kom deg fra ${level.start.name} til ${level.targets[0].name} på ${numLegs} etapper og ${timeDescription}`}
                        <br />
                        <br />
                        TODO: skrive en dynamisk tekst på optimal rute. Vår
                        reiseplanlegger har beregnet en optimal rute der etapper
                        er 2, og reisetid er 7 timer, 42 minutter.
                    </Paragraph>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Dette feltet er påkrevet.' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Navn"
                                placeholder=""
                                {...field}
                                variant={fieldState.error ? 'error' : 'info'}
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
                                variant={fieldState.error ? 'error' : 'info'}
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
                                variant={fieldState.error ? 'error' : 'info'}
                                feedback={fieldState.error?.message}
                            />
                        )}
                    />
                    <div
                        className={`border-2 ${
                            errors.consent ? 'border-coral' : 'border-blue-60'
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
                                    setValue('consent', !getValues('consent'))
                                }
                            />
                            <Label className=" col-span-5 cursor-pointer select-none">
                                Jeg samtykker til at Entur kan kontakte meg på
                                e-post i forbindelse med konkurransen.
                            </Label>
                        </div>
                    </div>

                    <div className="flex flex-row mt-4 gap-4">
                        <PrimaryButton
                            className={`select-none ${
                                watch('consent') && 'bg-blue-main'
                            }`}
                            loading={isSubmitting || isLoading}
                            disabled={!watch('consent') && !isValid}
                            type="submit"
                        >
                            Lagre poengsum
                        </PrimaryButton>
                        <SecondaryButton
                            className="bg-lavender select-none"
                            loading={isSubmitting || isLoading}
                            onClick={() => navigate('/')}
                        >
                            Avslutt reise
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
