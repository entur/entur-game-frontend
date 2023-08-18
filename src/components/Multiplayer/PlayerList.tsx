import { Heading3, ListItem, NumberedList } from '@entur/typography'
import React, { useEffect } from 'react'

import { getGame } from '../../api/gameApi'

type props = {
    refreshCounter: number
    sessionId: string | null
}

function PlayerList({ refreshCounter, sessionId }: props): JSX.Element {
    const [players, setPlayers] = React.useState<string[]>([])

    useEffect(() => {
        async function fetchData() {
            if (sessionId) {
                const response = await getGame(sessionId)
                const [playerNames] = response.playerList.map(
                    (player) => player.name,
                )
                setPlayers([playerNames])
            }
        }
        fetchData()
    }, [refreshCounter])

    return (
        <>
            <Heading3>Spillere</Heading3>
            <NumberedList>
                {players.map((player) => (
                    <ListItem key={player}>
                        {player.replaceAll('"', '')}
                    </ListItem>
                ))}
            </NumberedList>
        </>
    )
}

export default PlayerList
