import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'

import './App.css'
import Multiplayer from './components/Multiplayer'
import MainPage from './pages/MainMenu'

function App(): JSX.Element {
    return (
        <ToastProvider>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/multiplayer" element={<Multiplayer />} />
            </Routes>
        </ToastProvider>
    )
}

export default App
