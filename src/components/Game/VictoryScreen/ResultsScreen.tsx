'use client'

import { Heading1, Heading3 } from '@entur/typography'
import React from 'react'
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
    return (
        <Contrast className="text-center">
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
                <Heading3>
                    Din plassering: <span className="text-coral">12</span>
                </Heading3>
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
                                <TableRow>
                                    <DataCell className="text-left">
                                        Reisetid
                                    </DataCell>
                                    <DataCell className="text-left">
                                        {totalTravelTime}
                                    </DataCell>
                                    <DataCell className="text-left">
                                        {event.optimalTravelTime}
                                    </DataCell>
                                </TableRow>
                                <TableRow>
                                    <DataCell className="text-left">
                                        Reiselengde
                                    </DataCell>
                                    <DataCell className="text-left">
                                        Null
                                    </DataCell>
                                    <DataCell className="text-left">
                                        Null
                                    </DataCell>
                                </TableRow>
                                <TableRow>
                                    <DataCell className="text-left">
                                        Antall steg
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
                        <div className="flex justify-center mt-4 gap-4">
                            <SecondaryButton onClick={() => router.push('/')}>
                                Avslutt
                            </SecondaryButton>
                            <PrimaryButton
                                onClick={() =>
                                    setCurrentScreen(Screen.Register)
                                }
                            >
                                Lagre poengsum
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Contrast>
    )
}

export default ResultsScreen
