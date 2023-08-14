import React, { ReactElement } from 'react'
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
import { formatIntervalToSeconds } from '../../../utils/dateFnsUtils'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    nickname: string
    level: Level
    target: StopPlace
    setTarget: (target: StopPlace) => void
    numLegs: number
    currentTime: Date
    startTime: Date
    startTimer: number
}
//TODO: Add react-form-hook to this component
//TODO: Text description on this session. Currently static
//TODO: Check if await savePlayerScore works
export function VictoryScreen({
    nickname = '',
    level,
    target,
    numLegs,
    currentTime,
    startTime,
    startTimer,
}: Props): ReactElement {
    const {
        formState: { errors },
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
    } = useForm({
        defaultValues: { name: nickname, email: '', consent: false },
    })
    const navigate = useNavigate()
    const [consent, setConsentStatus] = React.useState(false)
    const [name, setName] = React.useState(nickname)
    const [pressed, setPressed] = React.useState(false)

    async function onSubmit() {
        await savePlayerScore({
            name: name,
            email: name, //TODO Change this
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
        setTimeout(() => {
            navigate('/')
        }, 3000)
        //If failed set pressed to false
    }

    return (
        <div className="bg-blue-90 min-h-screen min-w-screen">
            <VictoryArtBoardOvalImage className="absolute -top-20 -left-32 hidden xl:block" />
            <VictoryArtBoardCookieImage className="absolute -bottom-28 -left-52  hidden xl:block" />
            <VictoryArtBoardCircleImage className="absolute bottom-60 -right-72 hidden xl:block" />
            <MenuNavBar />
            <div className="flex justify-center">
                <form
                    className="flex flex-col max-w-3xl mt-20 pr-4 pl-4 gap-6"
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                    })}
                >
                    <Heading3 className="font-semibold">Du er fremme!</Heading3>
                    <Paragraph>
                        Du kom deg fra Jernbanetorget, Oslo til Trondheim S,
                        Trondheim på 2 etapper og 9 timer 2 minutter 55
                        sekunder.
                        <br />
                        <br />
                        Vår reiseplanlegger har beregnet en optimal rute der
                        etapper er 2, og reisetid er 7 timer, 42 minutter.
                    </Paragraph>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Dette feltet er påkrevet.' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Navn"
                                placeholder=""
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
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
                            className="select-none"
                            // loading={pressed}
                            // disabled={!consent}
                            type="submit"
                            // onClick={async () => {
                            //     if (!pressed) {
                            //         setPressed(true)
                            //         await onSubmit()
                            //     }
                            // }}
                        >
                            Lagre poengsum
                        </PrimaryButton>
                        <SecondaryButton
                            className="bg-lavender select-none"
                            loading={pressed}
                            onClick={() => navigate('/')}
                        >
                            Spill på nytt
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
