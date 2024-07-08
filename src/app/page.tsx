'use client'

import React, { ReactElement } from 'react'
import SplashScreen from '@/components/SplashScreen/SplashScreen'
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

export default function MainPage(): ReactElement {
    const client = new ApolloClient({
        uri: 'https://api.entur.io/journey-planner/v3/graphql',
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={client}>
            <SplashScreen />
        </ApolloProvider>
    )
}
