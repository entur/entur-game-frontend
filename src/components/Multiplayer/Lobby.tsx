import { PrimaryButton } from '@entur/button'
import { TextField } from '@entur/form'
import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { CopyableText } from '@entur/alert'
import { sprinkleEmojis } from 'emoji-sprinkle'

import PlayerList from './PlayerList'
import { EASY, HARD, Level, MEDIUM } from '../../constant/levels'
import { getRandomString } from '../../utils/getRandomString'

const levels = {
    EASY: EASY,
    MEDIUM: MEDIUM,
    HARD: HARD,
}

type Props = {
    setReady: React.Dispatch<React.SetStateAction<boolean>>
    isOwner: boolean
    setOwner: React.Dispatch<React.SetStateAction<boolean>>
    sessionId: string | null
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>
    level: Level
    setLevel: React.Dispatch<React.SetStateAction<Level>>
    winner: string
    setWinner: React.Dispatch<React.SetStateAction<string>>
    nickname: string
    setNickname: React.Dispatch<React.SetStateAction<string>>
    finished: boolean
    client: Client
}

function Lobby({
    setReady,
    isOwner,
    setOwner,
    sessionId,
    setSessionId,
    level,
    setLevel,
    nickname,
    setNickname,
    client,
}: Props): JSX.Element {
    const [isJoined, setJoined] = useState<boolean>(false)
    const [players, setPlayers] = useState<string[]>([])

    useEffect(() => {
        client.configure({
            brokerURL: 'ws://localhost:8080/game-ws',
            // brokerURL: 'ws://localhost:8080/game-ws',
            onConnect: () => {
                console.log('onConnect')
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str)
            },
        })
        client.activate()
    }, [])

    if (isJoined) {
        return (
            <div
                style={{
                    maxWidth: '1000px',
                }}
            >
                <CopyableText
                    successHeading="Kommando kopiert!"
                    successMessage="Lim den inn i terminalen."
                >
                    {sessionId ?? ''}
                </CopyableText>

                {isOwner && <PlayerList players={players} />}
                {isOwner && (
                    <PrimaryButton
                        onClick={() => {
                            client.publish({
                                destination: '/topic/' + sessionId + '/ready',
                                body: 'ready',
                            })
                        }}
                    >
                        Start spillet
                    </PrimaryButton>
                )}
            </div>
        )
    }

    return (
        <div
            style={{
                maxWidth: '1000px',
            }}
        >
            <TextField
                label="Kallenavn"
                value={nickname ?? ''}
                onChange={(event) => {
                    setNickname(event.target.value)
                }}
            />
            <TextField
                label="Spill-ID"
                value={sessionId ?? ''}
                onChange={(event) => {
                    setSessionId(event.target.value)
                }}
            />
            {sessionId && nickname && (
                <PrimaryButton
                    onClick={() => {
                        if (sessionId !== null) {
                            client.subscribe(
                                '/topic/' + sessionId,
                                (message) => {
                                    console.log(
                                        new TextDecoder().decode(
                                            message.binaryBody,
                                        ),
                                    )
                                },
                            )

                            client.publish({
                                destination: '/topic/' + sessionId + '/players',
                                body: JSON.stringify(nickname),
                            })

                            client.subscribe(
                                '/topic/' + sessionId + '/ready',
                                (message) => {
                                    setReady(
                                        new TextDecoder().decode(
                                            message.binaryBody,
                                        ) === 'ready',
                                    )
                                },
                            )

                            client.subscribe(
                                '/topic/' + sessionId + '/game-level',
                                (message) => {
                                    const newLevel = new TextDecoder()
                                        .decode(message.binaryBody)
                                        .replaceAll('"', '')
                                        .split(':')
                                    const difficulty = newLevel[0]
                                    const levelNumber = newLevel[1]

                                    const keyValues = Object.entries(levels)
                                    const newLevelToChange = keyValues.find(
                                        (level) => level[0] === difficulty,
                                    )

                                    if (
                                        newLevelToChange &&
                                        newLevelToChange[1][
                                            Number(levelNumber)
                                        ] !== level
                                    ) {
                                        setLevel(
                                            newLevelToChange[1][
                                                Number(levelNumber)
                                            ],
                                        )
                                    }
                                },
                            )
                        }
                        client.subscribe(
                            '/topic/' + sessionId + '/finished',
                            (message) => {
                                const winner = new TextDecoder()
                                    .decode(message.binaryBody)
                                    .replaceAll('"', '')
                                if (nickname !== winner) {
                                    sprinkleEmojis({
                                        emoji: '😭',
                                        count: 50,
                                        fade: 10,
                                        fontSize: 30,
                                    })
                                }
                            },
                        )
                        setJoined(true)
                    }}
                >
                    Bli med
                </PrimaryButton>
            )}
            {nickname && !sessionId && (
                <PrimaryButton
                    onClick={() => {
                        const randomId = getRandomString(6)
                        setSessionId(randomId)

                        client.subscribe('/topic/' + randomId, (message) => {
                            console.log(
                                new TextDecoder().decode(message.binaryBody),
                            )
                        })
                        client.subscribe(
                            '/topic/' + randomId + '/players',
                            (message) => {
                                setPlayers((prev) => [
                                    ...prev,
                                    new TextDecoder().decode(
                                        message.binaryBody,
                                    ),
                                ])
                            },
                        )
                        client.subscribe(
                            '/topic/' + randomId + '/ready',
                            (message) => {
                                setReady(
                                    new TextDecoder().decode(
                                        message.binaryBody,
                                    ) === 'ready',
                                )
                            },
                        )
                        client.publish({
                            destination: '/topic/' + randomId + '/players',
                            body: JSON.stringify(nickname),
                        })
                        setOwner(true)
                        setJoined(true)
                    }}
                >
                    Lag nytt spill
                </PrimaryButton>
            )}
        </div>
    )
}

export default Lobby
