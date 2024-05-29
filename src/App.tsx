import React from 'react'
import { ToastProvider } from '@entur/alert'
import flagsmith from 'flagsmith'
import { FlagsmithProvider } from 'flagsmith/react'

import './App.css'
import { BackgroundProvider } from './contexts/backgroundContext'
import BackgroundComponent from './components/BackgroundComponent'
import { Router } from './Router'

const environmentID = import.meta.env.VITE_APP_FLAGSMITH_ENVIRONMENT

function App(): JSX.Element {
    return (
        <FlagsmithProvider
            options={{
                environmentID: environmentID,
            }}
            flagsmith={flagsmith}
        >
            <ToastProvider>
                <BackgroundProvider>
                    <BackgroundComponent>
                        <Router />
                    </BackgroundComponent>
                </BackgroundProvider>
            </ToastProvider>
        </FlagsmithProvider>
    )
}

export default App
