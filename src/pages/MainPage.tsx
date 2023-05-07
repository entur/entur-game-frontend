import React, { useState } from 'react'
import { Heading1, Heading2, Paragraph } from '@entur/typography'

import SelectLevel from '../components/SelectLevel'
import { EASY, Level } from '../Level'
import Game from '../components/game'
import { Leaderboard } from '../components/scoreBoard/LeaderBoard'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'

export function MainPage(): JSX.Element {
    const [showIntro, setIntroShown] = useState<boolean>(true)
    const [level, setLevel] = useState<Level>(EASY[0])
    const [startTimer, setStartTimer] = useState<number>(0)

    const handleStartGame = (newLevel: Level) => {
        setLevel(newLevel)
        setStartTimer(Date.now())
        setIntroShown(false)
    }

    return (
        <div className="app">
            {showIntro ? (
                <>
                    <Heading1>Er du smartere enn vår reiseplanlegger?</Heading1>
                    <Paragraph>
                        Du har bestemt deg for å reise på norgesferie med
                        kollektivtransport i år. For å gjøre ting ekstra
                        spennende ønsker du ikke å bruke digitale hjelpemidler
                        for å finne ut hvilke transportetapper du skal ta.
                    </Paragraph>
                    <Paragraph>
                        Klarer du å fullføre reisene uten hjelp av reisesøk?
                        Test hvor godt du kjenner til kollektiv-Norge her!
                    </Paragraph>
                    <Heading2>Velg en reise</Heading2>
                    <SelectLevel handleStartGame={handleStartGame} />
                    <Leaderboard />
                    <div style={{ marginTop: '300px' }}>
                        <Paragraph>
                            Hvis du vil spille mot en annen person{' '}
                        </Paragraph>
                        <Link to="/multiplayer">
                            <PrimaryButton>Trykk her</PrimaryButton>
                        </Link>
                    </div>
                </>
            ) : (
                // TODO: Move this to its own url path?
                <Game
                    level={level}
                    startTimer={startTimer}
                    handleWinner={() => {
                        console.log('FIX ME')
                    }}
                />
            )}
        </div>
    )
}

export default MainPage
