import React from 'react'
import { Heading1, Heading2, Paragraph } from '@entur/typography'

import SelectLevel from '../components/SelectLevel'

import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'

export function MainPage(): JSX.Element {
    return (
        <div className="app">
            <Heading1>Er du smartere enn vår reiseplanlegger?</Heading1>
            <Paragraph>
                Du har bestemt deg for å reise på norgesferie med
                kollektivtransport i år. For å gjøre ting ekstra spennende
                ønsker du ikke å bruke digitale hjelpemidler for å finne ut
                hvilke transportetapper du skal ta.
            </Paragraph>
            <Paragraph>
                Klarer du å fullføre reisene uten hjelp av reisesøk? Test hvor
                godt du kjenner til kollektiv-Norge her!
            </Paragraph>
            <Heading2>Velg en reise</Heading2>
            <SelectLevel />
            <div style={{ marginTop: '300px' }}>
                <Paragraph>Hvis du vil spille mot en annen person </Paragraph>
                <Link to="/multiplayer">
                    <PrimaryButton>Trykk her</PrimaryButton>
                </Link>
            </div>
        </div>
    )
}

export default MainPage
