'use client'

import { Heading1, Heading2, Heading3 } from '@entur/typography'
import React, { useState, useEffect } from 'react'
import { Contrast } from '@entur/layout'
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
    const [rank, setRank] = useState<number>(1)

    useEffect(() => {
        calculateRankOfScore(scoreValue).then(setRank)
    }, [scoreValue])

    const totalTravelTimeDescription = formatMilliseconds(
        totalTravelTime * 1000,
    )
    const optimalTravelTimeDescription = formatMilliseconds(
        event.optimalTravelTime * 1000,
    )

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    return (
        <Contrast className="text-center relative">
            <Heading1>Resultater</Heading1>
            <div className="relative w-full mt-8">
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
                <Heading2>
                    Din plassering: <span className="text-coral">{rank}</span>
                </Heading2>
            </div>
            <div>
                <Heading3>Oppsummering</Heading3>
                <div className="min-w-screen flex justify-center">
                    <div className="w-1/2">
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
                        <br />
                        <br />
                        <div className="flex justify-center mt-4 gap-4">
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
                    </div>
                </div>
            </div>
            <Image
                src={WomanWithLuggage}
                alt="entur partner"
                width={480}
                className="absolute bottom-0 right-0 mr-[-16px] transform scale-x-[-1]"
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
        </Contrast>
    )
}

export default ResultsScreen
