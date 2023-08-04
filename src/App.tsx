import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'

import './App.css'
import Multiplayer from './components/Multiplayer/Multiplayer'
import MainPage from './pages/main/MainPage'
import GamePage from './pages/game/[level-id]'
import { MainMenu } from './pages/MainMenu'

function App(): JSX.Element {
    return (
        <ToastProvider>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/game/:levelId" element={<GamePage />} />
                <Route path="/multiplayer" element={<Multiplayer />} />
            </Routes>
        </ToastProvider>
    )
}

export default App
