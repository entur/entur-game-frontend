import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './components/Game'
import Multiplayer from './components/Multiplayer'

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
    )
}

export default App
