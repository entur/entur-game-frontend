import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@entur/alert'
import flagsmith from 'flagsmith'
import { FlagsmithProvider } from 'flagsmith/react'

import './App.css'
import Multiplayer from './components/Multiplayer/Multiplayer'
import PracticePage from './pages/practice/PracticePage'
import GamePage from './pages/game/[level-id]'
import { MainMenu } from './pages/MainMenu'
import { BackgroundProvider } from './backgroundContext'
import BackgroundComponent from './components/BackgroundComponent'
import { OptionMenu } from './pages/option/OptionMenu'
import EventHighscorePage from './pages/event-high-score/EventHighscorePage'
import { EditEvent } from './pages/event/edit/EditEvent'

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
                        <Routes>
                            <Route path="/" element={<MainMenu />} />
                            <Route
                                path="/practice"
                                element={<PracticePage />}
                            />
                            <Route path="/option" element={<OptionMenu />} />
                            <Route
                                path="/game/:difficulty"
                                element={<GamePage />}
                            />
                            <Route
                                path="/multiplayer"
                                element={<Multiplayer />}
                            />
                            <Route
                                path="/EventHighscore"
                                element={<EventHighscorePage />}
                            />
                            <Route path="/event/edit" element={<EditEvent />} />
                        </Routes>
                    </BackgroundComponent>
                </BackgroundProvider>
            </ToastProvider>
        </FlagsmithProvider>
    )
}

export default App
