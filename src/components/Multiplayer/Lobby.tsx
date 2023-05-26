import { PrimaryButton } from '@entur/button'
import { TextField } from '@entur/form'
import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { CopyableText } from '@entur/alert'
import { sprinkleEmojis } from 'emoji-sprinkle'

import PlayerList from './PlayerList'
import { EASY, HARD, Level, MEDIUM } from '../../constant/levels'
import { useGameSocket } from '../../hooks/useGameSocket'
import { createGame, joinGame, startGame } from '../../api/gameApi'
import invariant from 'tiny-invariant'

const levels = {
    EASY: EASY,
    MEDIUM: MEDIUM,
    HARD: HARD,
}

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
    const { client, configureWebSocket, subscribeToGame } = useGameSocket()
    const [refreshCounter, setRefreshCounter] = useState<number>(0)
    const [isJoined, setJoined] = useState<boolean>(false)
    //TODO: Use isFinished
    const [isFinished, setFinished] = useState<boolean>(false)

    useEffect(() => {
        configureWebSocket()
    }, [])

    if (isJoined) {
        invariant(sessionId !== null, 'sessionId is null')
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
                    <PrimaryButton onClick={() => startGame(sessionId, level.id)}>
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
                    onClick={async () => {
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
                    }}
                >
                    Lag nytt spill
                </PrimaryButton>
            )}
        </div>
    )
}

export default Lobby
