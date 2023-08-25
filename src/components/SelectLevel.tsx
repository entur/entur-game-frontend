import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import easy from '@assets/images/easy.png'
import medium from '@assets/images/medium.png'
import hard from '@assets/images/hard.png'
import { EASY, EVENT, HARD, MEDIUM } from '../constant/levels'
import { RadioGroup, RadioPanel } from '@entur/form'
import { Button, SecondaryButton } from '@entur/button'
import { Heading5 } from '@entur/typography'
import iconRightArrow from '../assets/icons/IconButtonRight.svg'

function SelectLevel({ isEvent }: { isEvent: boolean }): JSX.Element {
    const navigate = useNavigate()
    const [selectedRadio, setSelectedRadio] = useState(null)
    const [showButton, setShowButton] = useState(false)

    const handleRadioClick = (levelId) => {
        setSelectedRadio(levelId)
        setShowButton(true)
    }

    const handleButtonClick = () => {
        if (selectedRadio !== null) {
            navigate(`/game/${selectedRadio}`)
        }
    }

    return (
        <>
            <div style={{ minWidth: '640px', maxHeight: '524px' }}>
                <RadioGroup
                    name="ticket-type"
                    label="Velg billettype:"
                    onChange={() => console.log('')}
                    value={selectedRadio}
                >
                    <div style={{ display: 'grid', gridGap: '16px' }}>
                        {!isEvent && (
                            <>
                                {EASY.map((level) => (
                                    <RadioPanel
                                        title={
                                            <span style={{ fontSize: '32px' }}>
                                                Barn
                                            </span>
                                        }
                                        key={level.name}
                                        secondaryLabel={level.difficulty}
                                        onClick={() =>
                                            handleRadioClick(level.id)
                                        }
                                        value={level.id}
                                        size="large"
                                        style={{
                                            width: '100%',
                                            height: '154px',
                                            paddingLeft: '190px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '22px',
                                                }}
                                            >
                                                Oslo{' '}
                                                <span
                                                    style={{ color: '#FF5959' }}
                                                >
                                                    -
                                                </span>{' '}
                                                Trondheim
                                            </span>
                                            <span
                                                style={{
                                                    marginTop: '10px',
                                                    fontSize: '14px',
                                                    color: '#BABBCF',
                                                }}
                                            >
                                                En reise mellom to av Norges
                                                største byer.{' '}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <img
                                                src={easy}
                                                alt="Your Image"
                                                style={{
                                                    width: '154px',
                                                    height: '154px',
                                                    marginLeft: '-190px',
                                                    marginTop: '-138px',
                                                }}
                                            />
                                        </div>
                                    </RadioPanel>
                                ))}
                                {MEDIUM.map((level) => (
                                    <RadioPanel
                                        title={
                                            <span style={{ fontSize: '32px' }}>
                                                Student
                                            </span>
                                        }
                                        key={level.name}
                                        secondaryLabel={level.difficulty}
                                        onClick={() =>
                                            handleRadioClick(level.id)
                                        }
                                        value={level.id}
                                        size="large"
                                        style={{
                                            width: '100%',
                                            height: '154px',
                                            paddingLeft: '190px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '22px',
                                                }}
                                            >
                                                Mandal{' '}
                                                <span
                                                    style={{ color: '#FF5959' }}
                                                >
                                                    -
                                                </span>{' '}
                                                Sjusjøen
                                            </span>
                                            <span
                                                style={{
                                                    marginTop: '10px',
                                                    fontSize: '14px',
                                                    color: '#BABBCF',
                                                }}
                                            >
                                                Fra kyst til fjell – en
                                                kollektivreise fra 1–810 moh.{' '}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <img
                                                src={medium}
                                                alt="Your Image"
                                                style={{
                                                    width: '154px',
                                                    height: '154px',
                                                    marginLeft: '-190px',
                                                    marginTop: '-138px',
                                                }}
                                            />
                                        </div>
                                    </RadioPanel>
                                ))}
                                {HARD.map((level) => (
                                    <RadioPanel
                                        title={
                                            <span style={{ fontSize: '32px' }}>
                                                Senior
                                            </span>
                                        }
                                        key={level.name}
                                        secondaryLabel={level.difficulty}
                                        onClick={() =>
                                            handleRadioClick(level.id)
                                        }
                                        value={level.id}
                                        size="large"
                                        style={{
                                            width: '100%',
                                            height: '154px',
                                            paddingLeft: '190px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '22px',
                                                }}
                                            >
                                                Halden{' '}
                                                <span
                                                    style={{ color: '#FF5959' }}
                                                >
                                                    -
                                                </span>{' '}
                                                Harstad
                                            </span>
                                            <span
                                                style={{
                                                    marginTop: '10px',
                                                    fontSize: '14px',
                                                    color: '#BABBCF',
                                                }}
                                            >
                                                Fra svorsk til nordnorsk, du
                                                avanserer!{' '}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <img
                                                src={hard}
                                                alt="Your Image"
                                                style={{
                                                    width: '154px',
                                                    height: '154px',
                                                    marginLeft: '-190px',
                                                    marginTop: '-138px',
                                                }}
                                            />
                                        </div>
                                    </RadioPanel>
                                ))}
                            </>
                        )}
                        {isEvent && (
                            <>
                                {EVENT.map((level) => (
                                    <RadioPanel
                                        title={
                                            <span style={{ fontSize: '32px' }}>
                                                JAVAZONE 2023
                                            </span>
                                        }
                                        key={level.name}
                                        secondaryLabel={level.difficulty}
                                        onClick={() =>
                                            handleRadioClick(level.id)
                                        }
                                        value={level.id}
                                        size="large"
                                        style={{
                                            width: '100%',
                                            height: '154px',
                                            paddingLeft: '190px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '22px',
                                                }}
                                            >
                                                Konkurranse
                                            </span>
                                            <span
                                                style={{
                                                    marginTop: '10px',
                                                    fontSize: '14px',
                                                    color: '#BABBCF',
                                                }}
                                            >
                                                Prøv sjansen og vinn
                                                sparkesykkel
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <img
                                                src={hard}
                                                alt="Your Image"
                                                style={{
                                                    width: '154px',
                                                    height: '154px',
                                                    marginLeft: '-190px',
                                                    marginTop: '-138px',
                                                }}
                                            />
                                        </div>
                                    </RadioPanel>
                                ))}
                            </>
                        )}
                        {showButton && (
                            <Button
                                variant="success"
                                style={{ height: '64px' }}
                                className="flex items-center justify-between w-full px-4 py-4 mt-10"
                                onClick={handleButtonClick}
                            >
                                <span className="mr-auto">Start reisen</span>
                                <span className="ml-auto">
                                    {/*<IconButtonRight className="w-5 h-5" />*/}
                                    <img
                                        className="w-5 h-5"
                                        src={iconRightArrow}
                                        alt="icon"
                                    ></img>
                                </span>
                            </Button>
                        )}
                    </div>
                    {!isEvent && (
                        <div>
                            <Heading5>
                                Ønsker du å pille med flere?{' '}
                                <Link to="/multiplayer" className="underline">
                                    Prøv flerspillermodus her
                                </Link>
                            </Heading5>
                        </div>
                    )}
                    <SecondaryButton
                        className="bg-lavender select-none mt-20"
                        onClick={() => navigate('/option')}
                    >
                        Til spillmodus
                    </SecondaryButton>
                </RadioGroup>
            </div>
        </>
    )
}

export default SelectLevel
