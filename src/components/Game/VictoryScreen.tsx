import React, { useState } from 'react'
import { Heading1, Paragraph } from '@entur/typography'
import { TextField } from '@entur/form'
import { StopPlace } from '@entur/sdk'
import { PrimaryButton, SuccessButton } from '@entur/button'
import { useNavigate } from 'react-router-dom'

import {
    formatIntervalToSeconds,
    formatTimeForEndOfGame,
} from '../../utils/dateFnsUtils'
import { Level } from '../../constant/levels'
import { savePlayerScore } from '../../api/playerScoreApi'

type Props = {
    nickname: string
    level: Level
    target: StopPlace
    setTarget: (target: StopPlace) => void
    numLegs: number
    currentTime: Date
    startTime: Date
    startTimer: number
}

function VictoryScreen({
    nickname,
    level,
    target,
    numLegs,
    currentTime,
    startTime,
    startTimer,
}: Props): JSX.Element {
    const [name, setName] = useState(nickname)
    const navigate = useNavigate()
    return (
        <div className="app">
            <Heading1>
                Du klarte det!{' '}
                <span role="img" aria-label="Konfetti">
                    🎉
                </span>
            </Heading1>
            <Paragraph>{`Du kom deg fra ${level.start.name} til ${
                target.name
            } på ${numLegs} ${
                numLegs === 1 ? 'etappe' : 'etapper'
            } og ${formatTimeForEndOfGame(
                currentTime,
                startTime,
            )}.`}</Paragraph>
            <Paragraph>{`Vår reiseplanlegger har beregnet en optimal rute der etapper er ${level.optimalRoute}, og reisetid er ${level.optimalTraveltime}.`}</Paragraph>

            <>
                <TextField
                    defaultValue={nickname}
                    style={{ marginBottom: '20px' }}
                    label="nickname"
                    onChange={(e) => setName(e.target.value)}
                ></TextField>
                <PrimaryButton
                    style={{ marginRight: '20px' }}
                    onClick={async () => {
                        await savePlayerScore({
                            nickname: name,
                            difficulty: level.difficulty,
                            fromDestination: {
                                destination: level.start.name,
                                id: level.start.id,
                            },
                            toDestination: {
                                destination: target.name,
                                id: target.id,
                            },
                            totalOptions: numLegs,
                            totalPlaytime: Math.trunc(
                                (Date.now() - startTimer) / 1000,
                            ),
                            totalTravelTime: formatIntervalToSeconds(
                                currentTime,
                                startTime,
                            ),
                        })
                        navigate(-1)
                    }}
                >
                    Lagre min poengsum!
                </PrimaryButton>
                <SuccessButton onClick={() => window.location.reload()}>
                    Spill på nytt
                </SuccessButton>
            </>
        </div>
    )
}

export default VictoryScreen
