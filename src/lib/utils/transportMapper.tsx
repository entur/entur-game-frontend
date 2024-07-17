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
import { TransportIconPickerProps } from '../types/types'

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
