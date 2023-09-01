import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'

import './App.css'
import Multiplayer from './components/Multiplayer/Multiplayer'
import PracticePage from './pages/main/PracticePage'
import GamePage from './pages/game/[level-id]'
import { MainMenu } from './pages/MainMenu'
import { BackgroundProvider } from './backgroundContext'
import BackroundComponent from './components/BackroundComponent'
import { OptionMenu } from './pages/OptionMenu'
import EventPage from './pages/main/EventPage'
import EventHighscorePage from './pages/EventHighscorePage'
import ShownTell from './pages/ShownTell'

function App(): JSX.Element {
    return (
        <ToastProvider>
            <BackgroundProvider>
                <BackroundComponent>
                    <Routes>
                        <Route path="/" element={<MainMenu />} />
                        <Route path="/practice" element={<PracticePage />} />
                        <Route path="/event" element={<EventPage />} />
                        <Route path="/option" element={<OptionMenu />} />
                        <Route path="/game/:levelId" element={<GamePage />} />
                        <Route path="/multiplayer" element={<Multiplayer />} />
                        <Route path="/EventHighscore" element={<EventHighscorePage />} />
                        <Route path="/Showntell" element={<ShownTell />} />
                    </Routes>
                </BackroundComponent>
            </BackgroundProvider>
        </ToastProvider>
    )
}

export default App
