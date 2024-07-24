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

interface ResultsScreenProps {
    event: Event
    numLegs: number
    setCurrentScreen: (screen: Screen) => void
}

function ResultsScreen({
    event,
    numLegs,
    setCurrentScreen,
}: ResultsScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <Contrast className="text-center">
            <Heading1>Resultater</Heading1>
            <div className="relative w-full mt-8">
                <div className="flex justify-center">
                    <Image
                        src={Ticket}
                        alt="entur partner"
                        width={200}
                        className="my-4"
                    />
                </div>
                <Heading1 className="absolute inset-x-0 right-12 top-8 text-6xl text-coral transform rotate-6">
                    75
                </Heading1>
                <Heading1 className="absolute inset-x-0 right-12 top-20 text-4xl text-coral transform rotate-6">
                    poeng
                </Heading1>
            </div>
            <div>
                <Heading3>Oppsummering</Heading3>
                <div className="min-h-screen min-w-screen flex justify-center">
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
                                        Null
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
                            <SecondaryButton>Avbryt</SecondaryButton>
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
