import { Maybe, Trip } from '@/lib/types/types'
import {
    formatPlannerDuration,
    formatTimePlanner,
} from '@/lib/utils/dateFnsUtils'
import { TransportIconPicker } from '@/lib/utils/transportMapper'
import { BannerAlertBox } from '@entur/alert'
import { ClockIcon, WalkIcon } from '@entur/icons'
import { TravelTag } from '@entur/travel'
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
                <div className="bg-blue-90 flex flex-col max-w-lg rounded-md p-6 gap-2">
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
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 -z-10 $fill-background-subdued-light" />
                        <div className="flex gap-6 space-x-4">
                            {suggestedTripData.tripPatterns[0].legs.map(
                                (leg) => (
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
                                                <SubParagraph>
                                                    {formatTimePlanner(
                                                        leg.expectedStartTime,
                                                    )}
                                                </SubParagraph>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <WalkIcon />
                                            </div>
                                        )}
                                    </div>
                                ),
                            )}
                        </div>
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
