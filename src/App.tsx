import React, { useState } from 'react';
import createEnturService, { Departure, TransportMode, StopPlace, QueryMode, StopPlaceDetails } from '@entur/sdk'
import './App.css';

const entur = createEnturService({
  clientName: 'mats-byrkjeland-tester-ting'
})

const START: StopPlace = {
  id: 'NSR:StopPlace:58366',
  name: 'Jernbanetorget, Oslo',
  latitude: 59.911898,
  longitude: 10.75038
}

const TARGET: StopPlace = {
  id: 'NSR:StopPlace:59977',
  name: "Trondheim S, Trondheim"
}

const ALL_MODES: QueryMode[] = [
  'foot',
  TransportMode.BUS,
  TransportMode.TRAM,
  TransportMode.RAIL,
  TransportMode.AIR,
  TransportMode.METRO,
  TransportMode.WATER,
]

function isTruthy<T>(thing: T | undefined): thing is T {
  return !!thing
}

function getDepartures(stopPlaceId: string, mode: QueryMode): Promise<Departure[]> {
  return entur.getDeparturesFromStopPlace(stopPlaceId, {
    limitPerLine: 1,
    whiteListedModes: [mode],
  })
}

async function getStopsOnLine(serviceJourneyId: string, date: string): Promise<StopPlace[]> {
  const departures = await entur.getDeparturesForServiceJourney(serviceJourneyId, date.slice(0, 10))
  return departures
    .map(departure => departure.quay?.stopPlace)
    .filter(isTruthy)
}

async function getWalkableStopPlaces(currentStopPlace: StopPlace): Promise<StopPlaceDetails[]> {
  if (!currentStopPlace.latitude || !currentStopPlace.longitude) {
    console.log('currentStopPlace');

    return []
  }
  const nearby = await entur.getNearestPlaces({
    latitude: currentStopPlace.latitude,
    longitude: currentStopPlace.longitude,
  }, {
    filterByPlaceTypes: ["StopPlace"],
    maximumDistance: 500
  })

  const stopPlaceIds = nearby.filter(place => place.type === 'StopPlace').map(({ id }) => id)
  const stopPlaces = await entur.getStopPlaces(stopPlaceIds)
  return stopPlaces.filter(isTruthy)
}

function App() {
  const [numLegs, setNumLegs] = useState<number>(0)
  const [stopPlace, setStopPlace] = useState<StopPlace>(START)
  const [mode, setMode] = useState<QueryMode | null>(null)
  const [departures, setDepartures] = useState<Departure[]>([])
  const [stopsOnLine, setStopsOnLine] = useState<(StopPlace | StopPlaceDetails)[]>([])

  const selectMode = (mode: QueryMode) => {
    setMode(mode)
    if (mode === 'foot') {
      getWalkableStopPlaces(stopPlace).then(stops => {
        console.log('stops', stops);

        setStopsOnLine(stops)
      })
    } else {
      getDepartures(stopPlace.id, mode).then(setDepartures)
    }
  }

  const selectDeparture = (departure: Departure) => {
    setDepartures([])
    getStopsOnLine(departure.serviceJourney.id, departure.expectedDepartureTime).then(setStopsOnLine)
  }

  const selectStopOnLine = (stop: StopPlace | undefined) => {
    setStopsOnLine([])
    setMode(null)
    if (stop) {
      setStopPlace(stop)
      setNumLegs(prev => prev + 1)
    }
  }

  if (stopPlace.id === TARGET.id) {
    return (
      <div>
        <h1>Du klarte det! <span role="img" aria-label="Konfetti">🎉</span></h1>
        <p>{`Du kom deg fra ${START.name} til ${TARGET.name} på ${numLegs} etapper.`}</p>
      </div>
    )
  }

  return (
    <div>
      <header>
        <p>
          Du er på {stopPlace.name}. Kom deg til {TARGET.name}!
        </p>
        <p>
          Du har reist {numLegs} etapper.
        </p>
      </header>
        {
          !mode ? (
            <div>
                <h2>Velg transportmåte:</h2>
            <ul>
              { ALL_MODES.map(mode => (
                <li key={mode}><button onClick={() => selectMode(mode)}>{mode}</button></li>
              ))}
            </ul>
          </div>
          ) : null
        }
      <div>
        { departures.length ? (
          <div>
            <h2>Velg avgang</h2>
            <ul>

            { departures.map(departure => (
              <li key={departure.destinationDisplay.frontText + departure.serviceJourney.id}>
                <button onClick={() => selectDeparture(departure)}>
                  {departure.serviceJourney.journeyPattern?.line.publicCode} {departure.destinationDisplay.frontText}
                </button>
              </li>
              ))}
              </ul>
          </div>
        ) : null}
      </div>
      <div>
        { stopsOnLine.length ? (
          <div>
            <h2>Hvor vil du gå av?</h2>
            <ul>

            { stopsOnLine.map(stop => (
              <li key={stop.id}>
                <button onClick={() => selectStopOnLine(stop)}>
                  {stop.name}
                </button>
              </li>
              ))}
              </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
