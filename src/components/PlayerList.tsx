import React from 'react'

type props = {
    players: string[]
}

function PlayerList({ players }: props): JSX.Element {
    console.log(players)
    return (
        <>
            {players.map((player) => (
                <p key={player}>{player}</p>
            ))}
        </>
    )
}

export default PlayerList
