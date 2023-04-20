import React from 'react'
import { Heading1 } from '@entur/typography'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'

function Multiplayer(): JSX.Element {
    return (
        <>
            <Heading1>MULTIPLAYER</Heading1>
            <Link to="/">
                <PrimaryButton>Take me back</PrimaryButton>
            </Link>
        </>
    )
}

export default Multiplayer
