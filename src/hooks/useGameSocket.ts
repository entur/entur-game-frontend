import { Client } from '@stomp/stompjs'
import React from 'react'

import { ALL_LEVELS, Level } from '../constant/levels'
import invariant from 'tiny-invariant'

const client = new Client()
const baseUrl = import.meta.env.VITE_APP_BACKEND_WS

type TopicResponse = {
    command: 'STARTED' | 'FINISHED' | 'REFRESH'
    gameLevel: string
}

type subscribeToGameProps = {
    gameId: string
    setReady: React.Dispatch<React.SetStateAction<boolean>>
    setLevel: React.Dispatch<React.SetStateAction<Level>>
    setFinished: React.Dispatch<React.SetStateAction<boolean>>
    setRefreshCounter: React.Dispatch<React.SetStateAction<number>>
}

const subscribeToGame = ({
    gameId,
    setLevel,
    setRefreshCounter,
    setReady,
    setFinished,
}: subscribeToGameProps) => {
    client.subscribe('/topic/' + gameId, (message) => {
        const textCoderResponse = new TextDecoder().decode(message.binaryBody) //TODO: Debugger
        console.log(textCoderResponse)
        const topicResponse: TopicResponse = JSON.parse(
            new TextDecoder().decode(message.binaryBody),
        )
        if (topicResponse.gameLevel !== null) {
            const level = ALL_LEVELS.find(
                (level) => level.id === topicResponse.gameLevel,
            )
            invariant(level !== undefined, 'Level is undefined')
            setLevel(level)
        }

        if (topicResponse.command === 'STARTED') {
            setReady(true)
        } else if (topicResponse.command === 'FINISHED') {
            setFinished(true)
        } else if (topicResponse.command === 'REFRESH') {
            setRefreshCounter((prev) => prev + 1)
        }
    })
}

const configureWebSocket = ({
    setPossibleGameId,
}: {
    setPossibleGameId: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    client.configure({
        brokerURL: `${baseUrl}/game-ws`,
        onConnect: () => {
            console.log('onConnect')
            client.subscribe('/topic/waiting-for-game', (message) => {
                const textCoderResponse = new TextDecoder().decode(
                    message.binaryBody,
                )
                console.log(textCoderResponse)
                setPossibleGameId(textCoderResponse)
            })
        },
        // Helps during debugging, remove in production
        debug: (str) => {
            console.log(new Date(), str)
        },
    })
    client.activate()
}

const publishMessage = (destination: string, message: string) => {
    client.publish({
        destination,
        body: message,
    })
}

type GameSocket = {
    client: Client
    configureWebSocket: ({
        setPossibleGameId,
    }: {
        setPossibleGameId: React.Dispatch<React.SetStateAction<string | null>>
    }) => void
    publishMessage: (destination: string, message: string) => void
    subscribeToGame: ({
        gameId,
        setLevel,
        setReady,
        setFinished,
        setRefreshCounter,
    }: subscribeToGameProps) => void
}

export function useGameSocket(): GameSocket {
    return {
        client,
        configureWebSocket,
        publishMessage,
        subscribeToGame,
    }
}
