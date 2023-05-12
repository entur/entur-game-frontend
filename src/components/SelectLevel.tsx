import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@entur/tab'
import { MediaCard } from '@entur/layout'

import easy from '@assets/images/easy.png'
import medium from '@assets/images/medium.png'
import hard from '@assets/images/hard.png'
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
                        <MediaCard
                            title={level.name}
                            key={level.name}
                            description={level.description}
                            onClick={() => navigate(`/game/${level.id}`)}
                            className="media-card-images"
                        >
                            <img
                                className="images"
                                src={easy}
                                alt="OSLO-TRONDHEIM"
                            />
                        </MediaCard>
                    ))}
                </TabPanel>
                <TabPanel>
                    {MEDIUM.map((level) => (
                        <MediaCard
                            title={level.name}
                            key={level.name}
                            description={level.description}
                            onClick={() => navigate(`/game/${level.id}`)}
                            className="media-card-images"
                        >
                            <img
                                className="images"
                                src={medium}
                                alt="MANDAL-SJUSJØEN"
                            />
                        </MediaCard>
                    ))}
                </TabPanel>
                <TabPanel>
                    {HARD.map((level) => (
                        <MediaCard
                            title={level.name}
                            key={level.name}
                            description={level.description}
                            onClick={() => navigate(`/game/${level.id}`)}
                            className="media-card-images"
                        >
                            <img
                                className="images"
                                src={hard}
                                alt="HALDEN-HARSTAD"
                            />
                        </MediaCard>
                    ))}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default SelectLevel
