import React from 'react'
import { ToastProvider } from '@entur/alert'

import './App.css'
import { BackgroundProvider } from './contexts/backgroundContext'
import BackgroundComponent from './components/BackgroundComponent'
import { Router } from './Router'

const environmentID = import.meta.env.VITE_APP_FLAGSMITH_ENVIRONMENT

function App(): JSX.Element {
    return (
        <ToastProvider>
            <BackgroundProvider>
                <BackgroundComponent>
                    <Router />
                </BackgroundComponent>
            </BackgroundProvider>
        </ToastProvider>
    )
}

export default App
