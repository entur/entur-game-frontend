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
            return <WalkIcon size={20} />
        case 'bus':
            return <BusIcon size={24} />
        case 'coach':
            return <BusIcon size={24} />
        case 'tram':
            return <TramIcon size={24} />
        case 'rail':
            return <TrainIcon size={24} />
        case 'metro':
            return <MetroIcon size={24} />
        case 'water':
            return <FerryIcon size={24} />
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
        case 'coach':
            return 'Ekspressbuss'
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
    const bus = () => (
        <LegLine
            style={style}
            direction="horizontal"
            pattern="dashed"
            color="#E3E6E8"
        ></LegLine>
    )
    const rail = () => (
        <LegLine
            style={style}
            direction="horizontal"
            pattern="line"
            color="#E3E6E8"
        ></LegLine>
    )
    switch (mode) {
        case 'bus':
            return bus()
        case 'coach':
            return bus()
        case 'rail':
            return rail()
        case 'tram':
            return rail()
        case 'metro':
            return rail()
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
