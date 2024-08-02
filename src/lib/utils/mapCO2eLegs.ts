import { StopAndTime } from '@/components/Game/Game'

type Props = {
    stopsOnLine: StopAndTime[]
    startStopPlaceId: string
    endStopPlaceId: string
}

export const mapCO2eLegs = ({
    stopsOnLine,
    startStopPlaceId,
    endStopPlaceId,
}: Props) => {
    const endIndex = stopsOnLine.findIndex(
        (stop) => stop.stopPlace.id === endStopPlaceId,
    )
    const inBetweenStops = stopsOnLine
        .slice(0, endIndex + 1)
        .map((stop) => stop.stopPlace.id)

    return [startStopPlaceId, ...inBetweenStops]
}
