import React, { useState } from 'react';

import createEnturService, { Departure, TransportMode, StopPlace, QueryMode, StopPlaceDetails } from '@entur/sdk'

import { TravelHeader } from '@entur/travel';
import { WalkingIcon, PlaneIcon, BusIcon, TramIcon, TrainIcon, FerryIcon, SubwayIcon } from '@entur/icons';
import { Heading1, Heading2, Paragraph } from '@entur/typography';
import { ChoiceChip,ChoiceChipGroup} from '@entur/chip';
import { PrimaryButton } from '@entur/button';

import './App.css';

const entur = createEnturService({
  clientName: 'mats-byrkjeland-tester-ting'
})

function getModeIcon(mode: QueryMode) {
  switch (mode) {
    case 'foot':
      return <WalkingIcon />
    case 'bus':
      return <BusIcon />
    case 'tram':
      return <TramIcon />
    case 'rail':
      return <TrainIcon />
    case 'air':
      return <PlaneIcon />
    case 'metro':
      return <SubwayIcon />
    case 'water':
      return <FerryIcon />
    default:
      return null
  }
}

function getModeTranslation(mode: QueryMode): string {
  switch (mode) {
    case 'foot':
      return 'Gange (maks 500 m)'
    case 'bus':
      return 'Buss'
    case 'tram':
      return 'Trikk'
    case 'rail':
      return 'Tog'
    case 'air':
      return 'Fly'
    case 'metro':
      return 'T-bane'
    case 'water':
      return 'Ferje'
    default:
      return 'Ukjent'
  }
}

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
  const [dead, setDead] = useState<boolean>(false)
  const [numLegs, setNumLegs] = useState<number>(0)
  const [stopPlace, setStopPlace] = useState<StopPlace>(START)
  const [mode, setMode] = useState<QueryMode | null>(null)
  const [departures, setDepartures] = useState<Departure[]>([])
  const [stopsOnLine, setStopsOnLine] = useState<(StopPlace | StopPlaceDetails)[]>([])

  const selectMode = (newMode: QueryMode) => {
    setMode(newMode)
    if (newMode === 'foot') {
      getWalkableStopPlaces(stopPlace).then((stops) => {
        setStopsOnLine(stops)
        if (!stops.length) {
          setDead(true)
        }
      })
    } else {
      getDepartures(stopPlace.id, newMode).then((deps) => {
        setDepartures(deps)
        if (!deps.length) {
          setDead(true)
        }
      })
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
      <div className="app">
        <Heading1>Du klarte det! <span role="img" aria-label="Konfetti">🎉</span></Heading1>
        <Paragraph>{`Du kom deg fra ${START.name} til ${TARGET.name} på ${numLegs} ${numLegs === 1 ? 'etappe' : 'etapper'}.`}</Paragraph>
        <PrimaryButton onClick={() => window.location.reload()}>Spill på nytt</PrimaryButton>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <TravelHeader from={START.name} to={TARGET.name} style={{marginBottom: '2rem'}} />
        <Paragraph>
          Du er på {stopPlace.name}. Kom deg til {TARGET.name} så fort som mulig!
        </Paragraph>
        <Paragraph>
          Du har reist {numLegs} etapper.
        </Paragraph>
      </header>
        {
          !mode ? (
            <div>
                <Heading2>Velg transportmåte fra {stopPlace.name}</Heading2>
                <ChoiceChipGroup value={mode || 'none'} onChange={console.log} name="Transport mode">
                  { ALL_MODES.map(mode => (
                        <ChoiceChip key={mode} value={mode} onClick={() => selectMode(mode)}>
                          {getModeIcon(mode)}
                          {getModeTranslation(mode)}
                        </ChoiceChip>
                  ))}
                </ChoiceChipGroup>
          </div>
          ) : null
        }
      <div>
        { departures.length ? (
          <div>
            <Heading2>Velg avgang</Heading2>
            <ChoiceChipGroup value="none" onChange={console.log} name="Departure">
              { departures.map(departure => (
                <ChoiceChip
                  key={departure.destinationDisplay.frontText + departure.serviceJourney.id}
                  value={departure.destinationDisplay.frontText + departure.serviceJourney.id}
                  onClick={() =>  selectDeparture(departure)}
                >
                    {mode ? getModeIcon(mode) : null }
                    {departure.serviceJourney.journeyPattern?.line.publicCode} {departure.destinationDisplay.frontText}
                </ChoiceChip>
                ))}
              </ChoiceChipGroup>
          </div>
        ) : null}
      </div>
      <div>
        { stopsOnLine.length ? (
          <div>
            <Heading2>Hvor vil du gå {mode === 'foot' ? 'til' : 'av'}?</Heading2>

            <ChoiceChipGroup value="none" onChange={console.log} name="Stop on line">
              { stopsOnLine.map(stop => (
                <ChoiceChip
                  key={stop.id}
                  value={stop.id}
                  onClick={() => selectStopOnLine(stop)}
                >
                    {stop.name}
                </ChoiceChip>
                ))}
              </ChoiceChipGroup>

          </div>
        ) : null}
      </div>

      { dead && mode ? (
        <div>
          <Heading2>Du døde!</Heading2>
          <Paragraph>
            {`Det går ingen avganger med ${getModeTranslation(mode).toLowerCase()} fra ${stopPlace.name} i nær fremtid.`}
            </Paragraph>
            <PrimaryButton onClick={() => window.location.reload()}>Prøv igjen</PrimaryButton>
        </div>
      ) : null }
    </div>
  );
}

export default App;
