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

interface ResultsScreenProps {
    event: Event
    numLegs: number
}

function ResultsScreen({ event, numLegs }: ResultsScreenProps): JSX.Element {
    window.scrollTo(0, 0)
    return (
        <Contrast className="text-center">
            <Heading1>Resultater</Heading1>
            <div className="relative w-full mt-8">
                <Heading1 className="absolute inset-x-0 right-12 top-28 text-6xl text-coral transform rotate-6">
                    75
                </Heading1>
                <Heading1 className="absolute inset-x-0 right-12 top-40 text-4xl text-coral transform rotate-6">
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
                    </div>
                </div>
            </div>
        </Contrast>
    )
}

export default ResultsScreen
