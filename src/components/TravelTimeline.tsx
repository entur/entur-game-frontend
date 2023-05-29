import { QueryMode, StopPlace } from '@entur/sdk'
import { TravelLeg, TravelLegProps } from '@entur/travel'
import React from 'react'
import { Heading3, Paragraph } from '@entur/typography'

type Props = {
    travelLegs: StopPlace[]
    travelLegsMode: QueryMode[]
}

export function TravelTimeline({
    travelLegs,
    travelLegsMode,
}: Props): JSX.Element {
    return (
        <div>
            <Heading3>Din reiserute</Heading3>
            <div
                style={{
                    maxHeight: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {travelLegs.map((travelLeg, index): JSX.Element => {
                    if (index === 0) {
                        return (
                            <div
                                key={Math.floor(Math.random() * 1000)}
                                style={{ display: 'flex' }}
                            >
                                <TravelLeg
                                    style={{ height: '75px' }}
                                    transport="foot"
                                    direction="vertical"
                                    showStart={false}
                                />
                                <div
                                    style={{
                                        height: '80px',
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                    }}
                                >
                                    <Paragraph
                                        margin="none"
                                        style={{ marginLeft: '20px' }}
                                    >
                                        {travelLeg.name}
                                    </Paragraph>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div
                            key={Math.floor(Math.random() * 1000)}
                            style={{ display: 'flex' }}
                        >
                            <TravelLeg
                                style={{ height: '75px' }}
                                transport={
                                    travelLegsMode[
                                        index - 1
                                    ] as TravelLegProps['transport']
                                }
                                direction="vertical"
                                showStart={false}
                            />
                            <div
                                style={{
                                    height: '80px',
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                }}
                            >
                                <Paragraph
                                    margin="none"
                                    style={{ marginLeft: '20px' }}
                                >
                                    {travelLeg.name}
                                </Paragraph>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
