import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@entur/tab'
import { EASY, HARD, Level, MEDIUM } from '../Level'
import { NavigationCard } from '@entur/layout'
import React from 'react'

type Props = {
    handleStartGame: (newLevel: Level) => void
}

function SelectLevel({ handleStartGame }: Props): JSX.Element {
    return (
        <Tabs style={{ marginRight: 'auto', marginTop: '40px' }}>
            <TabList>
                <Tab>Lett</Tab>
                <Tab>Middels</Tab>
                <Tab>Vanskelig</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {EASY.map((level) => (
                        <NavigationCard
                            title={level.name}
                            key={level.name}
                            onClick={() => handleStartGame(level)}
                            style={{
                                marginTop: 8,
                                marginRight: 8,
                                cursor: 'pointer',
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
                            onClick={() => handleStartGame(level)}
                            style={{
                                marginTop: 8,
                                marginRight: 8,
                                cursor: 'pointer',
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
                            onClick={() => handleStartGame(level)}
                            style={{
                                marginTop: 8,
                                marginRight: 8,
                                cursor: 'pointer',
                            }}
                        >
                            {level.description}
                        </NavigationCard>
                    ))}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default SelectLevel
