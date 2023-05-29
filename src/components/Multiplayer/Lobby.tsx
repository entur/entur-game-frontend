import { PrimaryButton, SecondaryButton } from '@entur/button'
import { TextField } from '@entur/form'
import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { CopyableText } from '@entur/alert'
import { sprinkleEmojis } from 'emoji-sprinkle'
import { useNavigate } from 'react-router-dom'

import PlayerList from './PlayerList'
import { Level } from '../../constant/levels'
import { useGameSocket } from '../../hooks/useGameSocket'
import { createGame, joinGame, startGame } from '../../api/gameApi'
import invariant from 'tiny-invariant'
import { Loader } from '@entur/loader'

//TOOD: Cleanup
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
}: Props): JSX.Element {
    const navigate = useNavigate()
    const {
        client,
        configureWebSocket,
        subscribeToGame,
        publishMessage,
        waitingForGame,
    } = useGameSocket()
    const [refreshCounter, setRefreshCounter] = useState<number>(0)
    const [isJoined, setJoined] = useState<boolean>(false)
    const [possibleGameId, setPossibleGameId] = useState<string | null>(null)
    //TODO: Use isFinished
    const [isFinished, setFinished] = useState<boolean>(false)

    useEffect(() => {
        configureWebSocket({ setPossibleGameId })
    }, [])

    useEffect(() => {
        if (client.connected) {
            waitingForGame({ setPossibleGameId })
        }
    }, [client.connected, navigate])

    const handleJoinGame = async () => {
        if (sessionId !== null) {
            await joinGame(sessionId, nickname)
            subscribeToGame({
                gameId: sessionId,
                setLevel,
                setFinished,
                setReady,
                setRefreshCounter,
            })
        }
        client.subscribe('/topic/' + sessionId + '/finished', (message) => {
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
                setTimeout(() => {
                    navigate(0)
                }, 8000)
            }
        })
        setJoined(true)
    }

    if (isJoined) {
        invariant(sessionId !== null, 'sessionId is null')
        publishMessage('/topic/waiting-for-game', sessionId)
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
                    {sessionId}
                </CopyableText>

                <PlayerList
                    refreshCounter={refreshCounter}
                    sessionId={sessionId}
                />

                {isOwner && (
                    <PrimaryButton
                        style={{ marginBottom: '20px' }}
                        onClick={() => startGame(sessionId, level.id)}
                    >
                        Start spillet
                    </PrimaryButton>
                )}
                {!isOwner && (
                    <Loader style={{ marginBottom: '30px' }}>
                        Venter på start signal
                    </Loader>
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
                style={{ marginBottom: '20px' }}
            />
            <TextField
                label="Spill-ID"
                value={sessionId ?? ''}
                onChange={(event) => {
                    setSessionId(event.target.value)
                }}
                style={{ marginBottom: '20px' }}
            />

            <PrimaryButton
                disabled={!(sessionId && nickname)}
                style={{ marginBottom: '20px', marginRight: '20px' }}
                onClick={handleJoinGame}
            >
                Bli med
            </PrimaryButton>
            <PrimaryButton
                disabled={!(nickname && !sessionId)}
                style={{ marginBottom: '20px', marginRight: '20px' }}
                onClick={async () => {
                    const game = await createGame(nickname)
                    setSessionId(game.id)
                    setOwner(true)
                    setJoined(true)
                    subscribeToGame({
                        gameId: game.id,
                        setLevel,
                        setFinished,
                        setReady,
                        setRefreshCounter,
                    })
                    client.subscribe(
                        '/topic/' + game.id + '/finished',
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
                                setTimeout(() => {
                                    navigate(0)
                                }, 8000)
                            }
                        },
                    )
                }}
            >
                Lag nytt spill
            </PrimaryButton>

            {!sessionId && possibleGameId && (
                <SecondaryButton
                    style={{ marginBottom: '20px', marginRight: '20px' }}
                    onClick={() => {
                        setSessionId(possibleGameId)
                    }}
                >
                    {`Et nytt spill ble oppdaget. Legg til "${possibleGameId}" som Spill-ID?`}
                </SecondaryButton>
            )}
        </div>
    )
}

export default Lobby
