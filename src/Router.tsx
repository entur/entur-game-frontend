import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainPage } from './pages'
import { PracticePage } from './pages/practice'
import { OptionPage } from './pages/option'
import { GamePage } from './pages/game.[eventName]'
import { EventHighScorePage } from './pages/event.high-score'
import { EventEditPage } from './pages/event.edit'
import { AdminPage } from './pages/adminpage'

export function Router() {
    return (
        <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/option" element={<OptionPage />} />
            <Route path="/game/:eventName" element={<GamePage />} />
            <Route
                path="/leaderboard/:difficulty"
                element={<EventHighScorePage />}
            />
            <Route path="/event/edit" element={<EventEditPage />} />
            <Route path="*" element={<>Page not found</>} />
        </Routes>
    )
}
