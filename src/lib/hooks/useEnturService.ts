import createEnturService, {
    Departure,
    QueryMode,
    StopPlace,
    StopPlaceDetails,
    TypeName,
} from '@entur/sdk'
import { isTruthy } from '../utils/isTruthy'

const entur = createEnturService({
    clientName: 'entur-game',
})

type Props = {
    entur: typeof entur
    getDepartures: typeof getDepartures
    getStopsOnLine: typeof getStopsOnLine
    getWalkableStopPlaces: typeof getWalkableStopPlaces
}

export function useEnturService(): Props {
    return {
        entur,
        getDepartures,
        getStopsOnLine,
        getWalkableStopPlaces,
    }
}

//TODO: current way finding locations, maybe move away from sdk in the future
function getDepartures(
    stopPlaceId: string,
    mode: QueryMode,
    date: Date,
): Promise<Departure[]> {
    return entur.getDeparturesFromStopPlace(stopPlaceId, {
        limitPerLine: 1,
        whiteListedModes: [mode],
        start: date,
    })
}

async function getStopsOnLine(
    serviceJourneyId: string,
    date: string,
): Promise<Departure[]> {
    const departures = await entur.getDeparturesForServiceJourney(
        serviceJourneyId,
        date.slice(0, 10),
    )
    return departures
        .filter((departure) => departure.quay?.stopPlace)
        .filter((departure) => departure.expectedDepartureTime > date)
}

async function getWalkableStopPlaces(
    currentStopPlace: StopPlace,
): Promise<StopPlaceDetails[]> {
    if (!currentStopPlace.latitude || !currentStopPlace.longitude) {
        return []
    }

    const nearby = await entur.getNearestPlaces(
        {
            latitude: currentStopPlace.latitude,
            longitude: currentStopPlace.longitude,
        },
        {
            filterByPlaceTypes: [TypeName.STOP_PLACE],
            maximumDistance: 500,
        },
    )

    const stopPlaceIds = nearby
        .filter(
            (place) =>
                place.type === 'StopPlace' && place.id !== currentStopPlace.id,
        )
        .map(({ id }) => id)

    const stopPlaces = await entur.getStopPlaces(stopPlaceIds)
    return stopPlaces.filter(isTruthy)
}
