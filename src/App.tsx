import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'

import './App.css'
import Multiplayer from './components/Multiplayer/Multiplayer'
import MainPage from './pages/main/MainPage'
import GamePage from './pages/game/[level-id]'
import { MainMenu } from './pages/MainMenu'
import { BackgroundProvider } from './backgroundContext'
import BackroundComponent from './components/BackroundComponent'
import { OptionMenu } from './pages/OptionMenu'

function App(): JSX.Element {
    return (
        <ToastProvider>
            <BackgroundProvider>
                <BackroundComponent>
                    <Routes>
                        <Route path="/" element={<MainMenu />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/option" element={<OptionMenu />} />
                        <Route path="/game/:levelId" element={<GamePage />} />
                        <Route path="/multiplayer" element={<Multiplayer />} />
                    </Routes>
                </BackroundComponent>
            </BackgroundProvider>
        </ToastProvider>
    )
}

export default App
