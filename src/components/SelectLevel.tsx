import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@entur/tab'
import { NavigationCard } from '@entur/layout'

import { EASY, HARD, MEDIUM } from '../constant/levels'

function SelectLevel(): JSX.Element {
    const navigate = useNavigate()
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
                            onClick={() => navigate(`/game/${level.id}`)}
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
                            onClick={() => navigate(`/game/${level.id}`)}
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
                            onClick={() => navigate(`/game/${level.id}`)}
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
