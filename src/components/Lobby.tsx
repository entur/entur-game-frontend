import { PrimaryButton } from '@entur/button'
import { TextField } from '@entur/form'
import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import PlayerList from './PlayerList'

function genRandomString(length: number) {
    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charLength = chars.length
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength))
    }
    return result
}

const client = new Client()

function Lobby({
    setReady,
    isOwner,
    setOwner,
}: {
    setReady: React.Dispatch<React.SetStateAction<boolean>>
    isOwner: boolean
    setOwner: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
    const [isJoined, setJoined] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')
    const [sessionId, setSessionId] = useState<string | null>(null)
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
                <TextField readOnly label="Spill-ID" value={sessionId ?? ''} />
                <PlayerList players={players} />
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
                        }
                        setJoined(true)
                    }}
                >
                    Bli med
                </PrimaryButton>
            )}
            {nickname && (
                <PrimaryButton
                    onClick={() => {
                        const randomId = genRandomString(6)
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
