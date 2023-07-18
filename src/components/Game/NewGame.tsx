import React, { ReactElement, useEffect, useState } from 'react'

import { Level } from '../../constant/levels'
import GameNavBar from '../NavBar/GameNavBar'
import { Heading2, Heading4 } from '@entur/typography'
import { ChoiceChip, ChoiceChipGroup } from '@entur/chip'
import { ALL_MODES } from '../../constant/queryMode'
import { getModeIcon, getModeTranslation } from '../../utils/transportMapper'
import { SleepIcon } from '@entur/icons'
import { InvalidTravel } from './InvalidTravel'
import { useNavigate } from 'react-router-dom'
import { Departure, QueryMode, StopPlace, StopPlaceDetails } from '@entur/sdk'
import { useEnturService } from '../../hooks/useEnturService'
import { addHours, addMinutes } from 'date-fns'
import {
    formatDateAndTime,
    formatTimeForEndOfGame,
} from '../../utils/dateFnsUtils'

interface StopAndTime {
    stopPlace: StopPlace | StopPlaceDetails
    time: Date
}

const startTime = new Date()

type Props = {
    nickname: string
    level: Level
    startTimer: number
    handleWinner: () => void
}

function NewGame({ level }: Props): ReactElement {
    const navigate = useNavigate()
    const [totalHp, setTotalHp] = useState<number>(2)
    const [hasBeenSprinkled, setSprinkled] = useState<boolean>(false)
    const [dead, setDead] = useState<boolean>(false)
    const [numLegs, setNumLegs] = useState<number>(0)
    const [travelLegsMode, setTravelLegsMode] = useState<QueryMode[]>([])
    const [stopPlace, setStopPlace] = useState<StopPlace>(level.start)
    const [travelLegs, setTravelLegs] = useState<StopPlace[]>([level.start])
    const [targets, setTargets] = useState<StopPlace[]>(level.targets)
    const [mode, setMode] = useState<QueryMode | null>(null)
    const [departures, setDepartures] = useState<Departure[]>([])
    const [stopsOnLine, setStopsOnLine] = useState<StopAndTime[]>([])
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [noTransport, setNoTransport] = useState<boolean>(false)
    const [usedMode, setUsedMode] = useState<QueryMode[]>([])
    const { getWalkableStopPlaces, getDepartures, getStopsOnLine } =
        useEnturService()

    useEffect(() => {
        setStopPlace(level.start)
        setTravelLegs([level.start])
        setTargets(level.targets)
    }, [level])

    const selectMode = (newMode: QueryMode) => {
        setMode(newMode)
        if (newMode === 'foot') {
            getWalkableStopPlaces(stopPlace).then((stops) => {
                setStopsOnLine(
                    stops.map((stop) => ({
                        stopPlace: stop,
                        time: addMinutes(currentTime, 2),
                    })),
                )
                if (!stops.length) {
                    if (totalHp > 0) {
                        setTotalHp((prev) => prev - 1)
                        setNoTransport(true)
                    }

                    if (totalHp < 1) {
                        setDead(true)
                        return
                    }

                    setUsedMode((prev) => [...prev, newMode])
                    setMode(null)
                } else {
                    setUsedMode([])
                    setTravelLegsMode((prev) => [...prev, newMode])
                }
            })
        } else {
            getDepartures(stopPlace.id, newMode, currentTime).then((deps) => {
                setDepartures(deps)
                if (!deps.length) {
                    if (totalHp > 0) {
                        setTotalHp((prev) => prev - 1)
                        setNoTransport(true)
                    }
                    if (totalHp < 1) {
                        setDead(true)
                        return
                    }
                    setUsedMode((prev) => [...prev, newMode])
                    setMode(null)
                } else {
                    setUsedMode([])
                    setTravelLegsMode((prev) => [...prev, newMode])
                }
            })
        }
    }

    const wait = () => {
        setCurrentTime((prev) => addHours(prev, 6))
    }

    return (
        <>
            <GameNavBar
                description={` Du har reist ${numLegs} og ${formatTimeForEndOfGame(
                    currentTime,
                    startTime,
                    level.difficulty,
                    numLegs,
                )}`}
                healthLeft={totalHp + 1}
            />
            <div className="mt-28 ml-72 mr-40">
                <div className="flex flex-row space-x-1">
                    <div className="text-xl font-semibold">
                        Du skal reise fra
                    </div>
                    <div className="text-xl font-semibold text-coral">
                        {level.start.name}
                    </div>
                    <div className="text-xl font-semibold">til</div>
                    <div className="text-xl font-semibold text-coral">
                        {level.targets[0].name}
                    </div>
                </div>
                <Heading4 margin="none">Hvordan vil du starte?</Heading4>
                <div className="mt-14">TODO: Travelleg</div>
                <div className="mr-4">
                    {!mode && (
                        <div className="bg-white border-2 rounded-md pl-10 pb-8 ml-5">
                            <Heading2>
                                Velg transportmåte fra{' '}
                                <span className="text-coral">
                                    {stopPlace.name}
                                </span>
                            </Heading2>
                            <ChoiceChipGroup
                                value={mode || 'none'}
                                onChange={console.log}
                                name="Transport mode"
                            >
                                <>
                                    {ALL_MODES.map((mode) => {
                                        const disabled = usedMode.includes(mode)
                                        return (
                                            <>
                                                <ChoiceChip
                                                    className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                                                    key={mode}
                                                    value={mode}
                                                    onClick={() =>
                                                        selectMode(mode)
                                                    }
                                                    disabled={disabled}
                                                >
                                                    {getModeIcon(mode)}
                                                    {getModeTranslation(mode)}
                                                </ChoiceChip>
                                            </>
                                        )
                                    })}
                                    <ChoiceChip
                                        className="border-2 ml-1 mr-2 mt-3 text-lg w-38 h-10 rounded-3xl"
                                        key="wait"
                                        value="wait"
                                        onClick={() => wait()}
                                    >
                                        <SleepIcon />
                                        Vent 6 timer
                                    </ChoiceChip>
                                    <InvalidTravel
                                        usedMode={usedMode}
                                        noTransport={noTransport}
                                        setNoTransport={setNoTransport}
                                        stopPlace={stopPlace.name}
                                    />
                                </>
                            </ChoiceChipGroup>
                        </div>
                    )}
                    <div>TODO: Travelleg</div>
                </div>
            </div>
        </>
    )
}

export default NewGame
