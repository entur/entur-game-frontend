import './Multiplayer.css'

import React, { useState } from 'react'
import { Heading1 } from '@entur/typography'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'
import Lobby from './Lobby'
import Game, { EASY, HARD, Level, MEDIUM } from './Game'
import { NavigationCard } from '@entur/layout'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@entur/tab'

function Multiplayer(): JSX.Element {
    const [ready, setReady] = useState<boolean>(false)
    const [level, setLevel] = useState<Level>(EASY[0])
    const [startTimer, setStartTimer] = useState<number>(0)
    const [isOwner, setOwner] = useState(false)
    return (
        <div className="multiplayer">
            {!ready && (
                <>
                    <Heading1>MULTIPLAYER</Heading1>
                    <Lobby
                        setReady={(value) => {
                            setReady(value)
                            setStartTimer(Date.now())
                        }}
                        isOwner={isOwner}
                        setOwner={setOwner}
                    />
                    {isOwner && (
                        <Tabs style={{ marginRight: 'auto' }}>
                            <TabList>
                                <Tab>Easy</Tab>
                                <Tab>Medium</Tab>
                                <Tab>Hard</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {EASY.map((level) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                            }}
                                            style={{
                                                marginTop: 8,
                                                marginRight: 8,
                                            }}
                                        >
                                            {level.description}
                                        </NavigationCard>
                                    ))}
                                </TabPanel>
                                <TabPanel>
                                    {MEDIUM.map((level) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                            }}
                                            style={{
                                                marginTop: 8,
                                                marginRight: 8,
                                            }}
                                        >
                                            {level.description}
                                        </NavigationCard>
                                    ))}
                                </TabPanel>
                                <TabPanel>
                                    {HARD.map((level) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                            }}
                                            style={{
                                                marginTop: 8,
                                                marginRight: 8,
                                            }}
                                        >
                                            {level.description}
                                        </NavigationCard>
                                    ))}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    )}
                    <Link to="/">
                        <PrimaryButton>Tilbake til hovedmeny</PrimaryButton>
                    </Link>
                </>
            )}

            {ready && (
                <Game
                    multiIntroShown
                    multiLevel={level}
                    multiStartTimer={startTimer}
                />
            )}
        </div>
    )
}

export default Multiplayer
