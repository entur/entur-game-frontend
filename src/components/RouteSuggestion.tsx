import { Maybe, Trip } from '@/lib/types/types'
import {
    formatPlannerDuration,
    formatTimePlanner,
} from '@/lib/utils/dateFnsUtils'
import { TransportIconPicker } from '@/lib/utils/transportMapper'
import { BannerAlertBox } from '@entur/alert'
import { ClockIcon, DestinationIcon, GoalIcon, WalkIcon } from '@entur/icons'
import { LegLine, TravelTag } from '@entur/travel'
import {
    Heading3,
    Heading5,
    Heading6,
    Paragraph,
    SubParagraph,
} from '@entur/typography'

type Props = {
    suggestedTripData: Maybe<Trip>
    startLocationName: Maybe<String>
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
            <div className="flex flex-col pt-12">
                <Heading3>Optimal Fremkomstmåte</Heading3>
                <Paragraph>
                    Dette er fremkomstmåten spillerne må ta for å få mest mulig
                    poeng{' '}
                </Paragraph>
            </div>
            {suggestedTripData?.tripPatterns && startLocationName ? (
                <div className="bg-blue-90 flex flex-col rounded-md p-6 gap-2">
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
                        <div className="flex justify-start flex-1">
                            {suggestedTripData.tripPatterns[0].legs.map(
                                (leg, index, array) => (
                                    <div className="flex flex-col">
                                        {leg.line ? (
                                            <div>
                                                <TravelTag
                                                    alert="none"
                                                    transport={leg.mode}
                                                >
                                                    <TransportIconPicker
                                                        transportType={leg.mode}
                                                    />
                                                    {leg.line?.publicCode}
                                                </TravelTag>

                                                <div
                                                    className={`inline-block ${
                                                        index ===
                                                        array.length - 1
                                                            ? 'w-full'
                                                            : 'w-[27px]'
                                                    }`}
                                                >
                                                    <LegLine
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
                                            </div>
                                        ) : (
                                            <div>
                                                <TravelTag>
                                                    <WalkIcon color="#8d8e9c" />
                                                </TravelTag>
                                                <div className="inline-block w-[27px] overflow-hidden">
                                                    <LegLine
                                                        direction="horizontal"
                                                        pattern="dotted"
                                                        color="#E3E6E8"
                                                    ></LegLine>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ),
                            )}
                        </div>
                        <TravelTag>
                            <DestinationIcon />
                        </TravelTag>
                    </div>
                </div>
            ) : (
                <BannerAlertBox
                    title="Ingen fremkomstmåte å vise "
                    variant="information"
                    className="max-w-3xl"
                >
                    Velg start, mål, startdato og -klokkeslett for å se optimal
                    fremkomstmåte.
                </BannerAlertBox>
            )}
        </div>
    )
}
