import { Heading3, ListItem, NumberedList } from '@entur/typography'
import React from 'react'

type props = {
    players: string[]
}

function PlayerList({ players }: props): JSX.Element {
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
