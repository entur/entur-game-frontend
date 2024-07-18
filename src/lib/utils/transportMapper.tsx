import React from 'react'
import { QueryMode } from '@entur/sdk'
import {
    BusIcon,
    FerryIcon,
    MetroIcon,
    TrainIcon,
    TramIcon,
    WalkIcon,
} from '@entur/icons'
import { Mode, TransportIconPickerProps } from '../types/types'
import { LegLine } from '@entur/travel'

export function getModeIcon(mode: QueryMode): JSX.Element | null {
    switch (mode) {
        case 'foot':
            return <WalkIcon />
        case 'bus':
            return <BusIcon />
        case 'tram':
            return <TramIcon />
        case 'rail':
            return <TrainIcon />
        case 'metro':
            return <MetroIcon />
        case 'water':
            return <FerryIcon />
        default:
            return null
    }
}

export function getModeTranslation(mode: QueryMode): string {
    switch (mode) {
        case 'foot':
            return 'Gange (maks 500 m)'
        case 'bus':
            return 'Buss'
        case 'tram':
            return 'Trikk'
        case 'rail':
            return 'Tog'
        case 'metro':
            return 'T-bane'
        case 'water':
            return 'Ferje'
        default:
            return 'Ukjent'
    }
}

export function TransportIconPicker({
    transportType,
}: TransportIconPickerProps): JSX.Element {
    switch (transportType) {
        case 'bus':
            return <BusIcon color="white" />
        case 'tram':
            return <TramIcon color="white" />
        case 'metro':
            return <MetroIcon color="white" />
        case 'rail':
            return <TrainIcon color="white" />
        case 'water':
            return <FerryIcon color="white" />
        default:
            return <BusIcon color="white" />
    }
}

export function LegLinePicker({ mode }: { mode?: Mode }) {
    const style = {
        minWidth: '1.5rem',
        backgroundColor: '#E3E6E8',
    }
    switch (mode) {
        case 'bus':
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="dashed"
                    color="#E3E6E8"
                ></LegLine>
            )
        case 'rail':
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="line"
                    color="#E3E6E8"
                ></LegLine>
            )
        case 'tram':
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="line"
                    color="#E3E6E8"
                ></LegLine>
            )
        case 'metro':
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="line"
                    color="#E3E6E8"
                ></LegLine>
            )
        case 'water':
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="wave"
                    color="#E3E6E8"
                ></LegLine>
            )
        default:
            return (
                <LegLine
                    style={style}
                    direction="horizontal"
                    pattern="dotted"
                    color="#E3E6E8"
                ></LegLine>
            )
    }
}
