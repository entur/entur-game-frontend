import React, { useEffect } from 'react'
import { Heading1, Heading2, Paragraph } from '@entur/typography'

import SelectLevel from '../../components/SelectLevel'

import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'
import { useBackground } from '../../backgroundContext'

export function MainPage(): JSX.Element {
    const { setBackgroundColor } = useBackground()

    useEffect(() => {
        setBackgroundColor('bg-blue-main')

        return () => setBackgroundColor('bg-blue-90')
    }, [setBackgroundColor])

    return (
        <div className="max-w-screen-xl xl:ml-72 xl:mr-40 ml-10 mr-10">
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
            <div style={{ marginTop: '40px' }}>
                <Link to="/multiplayer">
                    <PrimaryButton>Flerspiller</PrimaryButton>
                </Link>
            </div>
            <Heading2>Velg en reise</Heading2>
            <SelectLevel />
        </div>
    )
}

export default MainPage
