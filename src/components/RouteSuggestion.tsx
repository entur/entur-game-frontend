import { Maybe, Trip } from '@/lib/types/types'
import {
    formatPlannerDuration,
    formatTimePlanner,
} from '@/lib/utils/dateFnsUtils'
import { TransportIconPicker } from '@/lib/utils/transportMapper'
import { BannerAlertBox } from '@entur/alert'
import { ClockIcon, DestinationIcon, WalkIcon } from '@entur/icons'
import { LegLine, TravelTag } from '@entur/travel'
import {
    Heading3,
    Heading5,
    Heading6,
    Paragraph,
    SubParagraph,
} from '@entur/typography'
import { Badge } from '@entur/layout'

type Props = {
    suggestedTripData: Maybe<Trip>
    startLocationName: Maybe<string>
}

export default function RouteSuggestion({
    suggestedTripData,
    startLocationName,
}: Props) {
    console.log('suggeste trip', suggestedTripData)
    console.log('start', startLocationName)
    console.log('sjekk doodelidoo', suggestedTripData?.tripPatterns)
    return (
        <div>
            <div className="flex flex-col pt-12 mb-4">
                <Heading3>Optimal fremkomstmåte for valgt rute</Heading3>
                <Paragraph margin="none">
                    Dette er fremkomstmåten spillerne må ta for å få maksimal
                    poengsum
                </Paragraph>
            </div>
            {suggestedTripData?.tripPatterns && startLocationName ? (
                <div className="bg-blue-90 flex flex-col max-w-fit min-w-[500px] rounded-md p-6 gap-2">
                    <div className="flex justify-between">
                        <Heading5 margin="none">
                            Fra {startLocationName}
                        </Heading5>
                        <div className="flex items-center gap-2">
                            <ClockIcon />
                            <Heading6 margin="none">
                                Reisetid:{' '}
                                {formatPlannerDuration(
                                    suggestedTripData.tripPatterns[0]?.duration,
                                )}
                            </Heading6>
                        </div>
                    </div>
                    <div className="flex pt-2 justify-between">
                        <ul className="flex flex-grow">
                            {suggestedTripData.tripPatterns[0].legs.map(
                                (leg, index, array) => (
                                    <>
                                        {index === array.length - 1 ? (
                                            <li className="flex-grow">
                                                {leg.line ? (
                                                    <>
                                                        <div className="flex items-center">
                                                            <TravelTag
                                                                alert="none"
                                                                transport={
                                                                    leg.mode
                                                                }
                                                            >
                                                                <TransportIconPicker
                                                                    transportType={
                                                                        leg.mode
                                                                    }
                                                                />
                                                                {
                                                                    leg.line
                                                                        ?.publicCode
                                                                }
                                                            </TravelTag>
                                                            <LegLine
                                                                style={{
                                                                    backgroundColor:
                                                                        '#E3E6E8',
                                                                }}
                                                                direction="horizontal"
                                                                pattern="line"
                                                                color="#E3E6E8"
                                                            ></LegLine>
                                                        </div>
                                                        <SubParagraph>
                                                            {formatTimePlanner(
                                                                leg.expectedStartTime,
                                                            )}
                                                        </SubParagraph>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center flex-grow">
                                                        <TravelTag>
                                                            <WalkIcon color="#8d8e9c" />
                                                        </TravelTag>
                                                        <div className="inline-block overflow-hidden">
                                                            <LegLine
                                                                style={{
                                                                    minWidth:
                                                                        '1rem',
                                                                    backgroundColor:
                                                                        '#E3E6E8',
                                                                    flexGrow: 1,
                                                                }}
                                                                direction="horizontal"
                                                                pattern="dotted"
                                                                color="#E3E6E8"
                                                            ></LegLine>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ) : (
                                            <li>
                                                {leg.line ? (
                                                    <>
                                                        <div className="flex items-center">
                                                            <TravelTag
                                                                alert="none"
                                                                transport={
                                                                    leg.mode
                                                                }
                                                            >
                                                                <TransportIconPicker
                                                                    transportType={
                                                                        leg.mode
                                                                    }
                                                                />
                                                                {
                                                                    leg.line
                                                                        ?.publicCode
                                                                }
                                                            </TravelTag>

                                                            <LegLine
                                                                style={{
                                                                    minWidth:
                                                                        '1rem',
                                                                    backgroundColor:
                                                                        '#E3E6E8',
                                                                }}
                                                                direction="horizontal"
                                                                pattern="line"
                                                                color="#E3E6E8"
                                                            ></LegLine>
                                                        </div>
                                                        <SubParagraph>
                                                            {formatTimePlanner(
                                                                leg.expectedStartTime,
                                                            )}
                                                        </SubParagraph>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center flex-grow">
                                                        <TravelTag>
                                                            <WalkIcon color="#8d8e9c" />
                                                        </TravelTag>
                                                        <div className="inline-block overflow-hidden">
                                                            <LegLine
                                                                style={{
                                                                    minWidth:
                                                                        '1rem',
                                                                    backgroundColor:
                                                                        '#E3E6E8',
                                                                    flexGrow: 1,
                                                                }}
                                                                direction="horizontal"
                                                                pattern="dotted"
                                                                color="#E3E6E8"
                                                            ></LegLine>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        )}
                                    </>
                                ),
                            )}
                            {/*<li className="flex-grow">*/}
                            {/*    <LegLine*/}
                            {/*        style={{*/}
                            {/*            minWidth: '1rem',*/}
                            {/*            backgroundColor: '#E3E6E8',*/}
                            {/*        }}*/}
                            {/*        direction="horizontal"*/}
                            {/*        pattern="dotted"*/}
                            {/*        color="#E3E6E8"*/}
                            {/*    ></LegLine>*/}
                            {/*</li>*/}
                        </ul>
                        <TravelTag>
                            <DestinationIcon />
                        </TravelTag>
                    </div>
                </div>
            ) : (
                <Badge variant="neutral" type="status">
                    Ingen rute valgt
                </Badge>
            )}
        </div>
    )
}
