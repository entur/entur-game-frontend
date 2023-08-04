import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'

import './App.css'
import Multiplayer from './components/Multiplayer/Multiplayer'
import MainPage from './pages/MainPage'
import GamePage from './pages/game/[level-id]'
import SplashScreen from './components/SplashScreen/SplashScreen'

function App(): JSX.Element {
    return (
        <ToastProvider>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/game/:levelId" element={<GamePage />} />
                <Route path="/multiplayer" element={<Multiplayer />} />
            </Routes>
        </ToastProvider>
    )
}

export default App
