import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './Game'
import Multiplayer from './Multiplayer'

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
    )
}

export default App
