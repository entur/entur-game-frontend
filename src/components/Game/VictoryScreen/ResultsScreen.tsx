'use client'

import BarChart from '@/components/Chart'
import { getActiveEvent } from '@/lib/api/eventApi'
import { Heading1, Heading2, Heading3 } from '@entur/typography'
import React, { useState, useEffect } from 'react'
import { Event } from '@/lib/types/types'
import {
    DataCell,
    HeaderCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from '@entur/table'
import Ticket from '@/lib/assets/images/Ticket.svg'
import Image from 'next/image'
import { Screen } from './VictoryScreen'
import { PrimaryButton, SecondaryButton } from '@entur/button'
import { useRouter } from 'next/navigation'
import { formatMilliseconds } from '@/lib/utils/dateFnsUtils'
import { ClockIcon, ForwardIcon, TrackIcon, ValueIcon } from '@entur/icons'
import { Modal } from '@entur/modal'
import { calculateRankOfScore } from '@/lib/utils/calculateRank'
import WomanWithLuggage from '@/lib/assets/images/Woman walking with luggage.svg'

interface ResultsScreenProps {
    event: Event
    numLegs: number
    scoreValue: number
    totalTravelTime: number
    setCurrentScreen: (screen: Screen) => void
}

function ResultsScreen({
    event,
    numLegs,
    scoreValue,
    totalTravelTime,
    setCurrentScreen,
}: ResultsScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    const router = useRouter()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isModalCO2Open, setModalCO2Open] = useState(false)
    const [rank, setRank] = useState<number>(1)
    const [activeEventName, setActiveEventName] = useState<string | null>(null)
    const co2eEnabled = localStorage.getItem('co2eEnabled') === 'true'

    useEffect(() => {
        calculateRankOfScore(scoreValue).then(setRank)
    }, [scoreValue])

    useEffect(() => {
        const getActiveEventName = async () => {
            const event = await getActiveEvent()
            if (event) {
                setActiveEventName(event.eventName)
            }
        }
        getActiveEventName()
    }, [])

    const totalTravelTimeDescription = formatMilliseconds(
        totalTravelTime * 1000,
    )
    const optimalTravelTimeDescription = formatMilliseconds(
        event.optimalTravelTime * 1000,
    )

    const openModal = () => setModalOpen(true)
    const openCO2Modal = () => setModalCO2Open(true)
    const closeModal = () => setModalOpen(false)
    const closeC02Modal = () => setModalCO2Open(false)

    return (
        <div className="text-center relative">
            <Heading1>Resultater</Heading1>
            <div className="relative w-full mt-4 2xl:mt-8">
                <div className="flex justify-center">
                    <Image
                        src={Ticket}
                        alt="entur partner"
                        width={240}
                        className="my-4"
                    />
                </div>
                <Heading1 className="absolute inset-x-0 right-12 top-12 text-6xl text-coral transform rotate-6">
                    {scoreValue}
                </Heading1>
                <Heading1 className="absolute inset-x-0 right-12 top-24 text-4xl text-coral transform rotate-6">
                    poeng
                </Heading1>
                <Heading2 className="-mt-2 2xl:mt-8">
                    Din plassering: <span className="text-coral">{rank}</span>
                </Heading2>
            </div>
            <div>
                <div className="min-w-screen flex justify-center">
                    <div className="w-1/2 text-left">
                        <div className="border border-white p-4 pt-0">
                            <Heading3>Oppsummering</Heading3>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <HeaderCell className="text-left">
                                            {' '}
                                        </HeaderCell>
                                        <HeaderCell className="text-left">
                                            Deg
                                        </HeaderCell>
                                        <HeaderCell className="text-left">
                                            Reiseplanleggeren
                                        </HeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="text-left bg-blue-20">
                                        <DataCell className="text-left">
                                            <span className="flex items-center">
                                                <ValueIcon className="mr-2 mb-0.5 relative" />
                                                Poengsum
                                            </span>
                                        </DataCell>
                                        <DataCell className="text-left">
                                            {scoreValue}
                                        </DataCell>
                                        <DataCell className="text-left">
                                            100
                                        </DataCell>
                                    </TableRow>
                                    <TableRow>
                                        <DataCell className="text-left">
                                            <span className="flex items-center">
                                                <ClockIcon className="mr-2 mb-0.5 relative" />
                                                Reisetid
                                            </span>
                                        </DataCell>
                                        <DataCell className="text-left">
                                            {totalTravelTimeDescription}
                                        </DataCell>
                                        <DataCell className="text-left">
                                            {optimalTravelTimeDescription}
                                        </DataCell>
                                    </TableRow>
                                    <TableRow className="text-left bg-blue-20">
                                        <DataCell className="text-left">
                                            <span className="flex items-center">
                                                <TrackIcon className="mr-2 mb-0.5 relative" />
                                                Antall steg
                                            </span>
                                        </DataCell>
                                        <DataCell className="text-left">
                                            {numLegs}
                                        </DataCell>
                                        <DataCell className="text-left">
                                            {event.optimalStepNumber}
                                        </DataCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <br />
                        <br />
                        <div className="flex justify-center -mt-2 2xl:mt-4 gap-4">
                            <SecondaryButton onClick={openModal}>
                                Avslutt uten å lagre
                            </SecondaryButton>
                            <PrimaryButton
                                onClick={() =>
                                    setCurrentScreen(Screen.Register)
                                }
                            >
                                <span className="flex items-center">
                                    Lagre poengsum
                                    <ForwardIcon className="ml-2 mb-1.5 relative" />
                                </span>
                            </PrimaryButton>
                        </div>
                        <br />
                        <br />
                        {co2eEnabled && (
                            <div className="flex justify-center -mt-2 2xl:mt-4 gap-4">
                                <SecondaryButton onClick={openCO2Modal}>
                                    CO2e
                                </SecondaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={WomanWithLuggage}
                alt="entur partner"
                width={480}
                className="absolute bottom-[-24px] right-0 transform scale-x-[-1]"
            />
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={closeModal}
                    title="Avslutte uten å lagre?"
                    size="medium"
                >
                    <p>
                        Hvis du avslutter nå, vil du ikke kunne være med i
                        konkurransen om å vinne kule premier.
                    </p>
                    <div className="flex justify-start mt-4 gap-4">
                        <SecondaryButton onClick={closeModal}>
                            Tilbake
                        </SecondaryButton>
                        <PrimaryButton
                            onClick={() => {
                                closeModal()
                                router.push('/')
                            }}
                        >
                            Avslutt uten å lagre
                        </PrimaryButton>
                    </div>
                </Modal>
            )}
            {isModalCO2Open && co2eEnabled && (
                <Modal
                    isOpen={isModalCO2Open}
                    onDismiss={closeC02Modal}
                    title="Reiseplanleggeren C02e - avtrykk"
                    size="medium"
                >
                    <p>
                        Se hvor mye CO2e utslipp du vil ha spart ved å reise
                        kollektivt
                    </p>
                    <Heading3>
                        <span className="text-coral">{activeEventName}</span>
                    </Heading3>
                    <BarChart></BarChart>
                    <div className="flex justify-start mt-4 gap-4">
                        <SecondaryButton onClick={closeC02Modal}>
                            Tilbake
                        </SecondaryButton>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ResultsScreen
