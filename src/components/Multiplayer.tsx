import './Multiplayer.css'

import React, { useState } from 'react'
import { Heading1 } from '@entur/typography'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@entur/button'
import Lobby from './Lobby'
import { NavigationCard } from '@entur/layout'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@entur/tab'
import { Client } from '@stomp/stompjs'

import { EASY, HARD, Level, MEDIUM } from '../Level'
import Game from './Game'

const client = new Client()

function Multiplayer(): JSX.Element {
    const [ready, setReady] = useState<boolean>(false)
    const [level, setLevel] = useState<Level>(EASY[0])
    const [startTimer, setStartTimer] = useState<number>(0)
    const [isOwner, setOwner] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [winner, setWinner] = useState<string>('')
    const [finished, setFinished] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')

    return (
        <div className="multiplayer">
            {!ready && (
                <>
                    <Heading1>Flerspiller modus</Heading1>
                    <Lobby
                        setReady={(value) => {
                            setReady(value)
                            setStartTimer(Date.now())
                        }}
                        isOwner={isOwner}
                        setOwner={setOwner}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        level={level}
                        setLevel={setLevel}
                        winner={winner}
                        nickname={nickname}
                        setNickname={setNickname}
                        setWinner={setWinner}
                        finished={finished}
                        client={client}
                    />
                    {isOwner && (
                        <Tabs style={{ marginRight: 'auto' }}>
                            <TabList>
                                <Tab>Lett</Tab>
                                <Tab>Middels</Tab>
                                <Tab>Vanskelig</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {EASY.map((level, index) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                                client.publish({
                                                    destination:
                                                        '/topic/' +
                                                        sessionId +
                                                        '/game-level',
                                                    body: JSON.stringify(
                                                        'EASY:' + index,
                                                    ),
                                                })
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
                                    {MEDIUM.map((level, index) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                                client.publish({
                                                    destination:
                                                        '/topic/' +
                                                        sessionId +
                                                        '/game-level',
                                                    body: JSON.stringify(
                                                        'MEDIUM:' + index,
                                                    ),
                                                })
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
                                    {HARD.map((level, index) => (
                                        <NavigationCard
                                            title={level.name}
                                            key={level.name}
                                            onClick={() => {
                                                setLevel(level)
                                                client.publish({
                                                    destination:
                                                        '/topic/' +
                                                        sessionId +
                                                        '/game-level',
                                                    body: JSON.stringify(
                                                        'HARD:' + index,
                                                    ),
                                                })
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
                    handleWinner={() => {
                        setFinished(true)
                        client.publish({
                            destination: '/topic/' + sessionId + '/finished',
                            body: JSON.stringify(nickname),
                        })
                    }}
                />
            )}
        </div>
    )
}

export default Multiplayer
