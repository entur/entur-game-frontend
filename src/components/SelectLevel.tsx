import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@entur/tab'
import { MediaCard } from '@entur/layout'

import easy from '@assets/images/easy.png'
import medium from '@assets/images/medium.png'
import hard from '@assets/images/hard.png'
import { EASY, HARD, MEDIUM } from '../constant/levels'
import { LeaderBoard } from './Multiplayer/LeaderBoard'

function SelectLevel(): JSX.Element {
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = React.useState<
        'Lett' | 'Middels' | 'Vanskelig'
    >('Lett')
    return (
        <>
            <div style={{ maxWidth: '700px' }}>
                <Tabs
                    onChange={(index: number) => {
                        if (index === 0) setDifficulty('Lett')
                        else if (index === 1) setDifficulty('Middels')
                        else if (index === 2) setDifficulty('Vanskelig')
                    }}
                    style={{ marginRight: 'auto', marginTop: '40px' }}
                >
                    <TabList>
                        <Tab>Lett</Tab>
                        <Tab>Middels</Tab>
                        <Tab>Vanskelig</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {EASY.map((level) => (
                                <MediaCard
                                    style={{ overflowX: 'scroll' }}
                                    title={level.name}
                                    key={level.name}
                                    description={level.description}
                                    onClick={() =>
                                        navigate(`/game/${level.id}`)
                                    }
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
                                    style={{ overflowX: 'scroll' }}
                                    title={level.name}
                                    key={level.name}
                                    description={level.description}
                                    onClick={() =>
                                        navigate(`/game/${level.id}`)
                                    }
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
                                    style={{ overflowX: 'scroll' }}
                                    title={level.name}
                                    key={level.name}
                                    description={level.description}
                                    onClick={() =>
                                        navigate(`/game/${level.id}`)
                                    }
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
            </div>
            <LeaderBoard difficulty={difficulty} />
        </>
    )
}

export default SelectLevel
