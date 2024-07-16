import { Maybe, Trip, isTrip } from '@/lib/types/types'
import { BannerAlertBox } from '@entur/alert'
import { ClockIcon } from '@entur/icons'
import { Heading3, Heading5, Heading6, Paragraph } from '@entur/typography'

type Props = {
    suggestedTripData: Trip
    startLocationName: Maybe<String>
}

export default function RouteSuggestion({
    suggestedTripData,
    startLocationName,
}: Props) {
    console.log('suggeste trip', suggestedTripData)
    console.log('start', startLocationName)
    console.log('is trip', isTrip(suggestedTripData))
    return (
        <div>
            <div className="flex flex-col pt-12">
                <Heading3>Optimal Fremkomstmåte</Heading3>
                <Paragraph>
                    Dette er fremkomstmåten spillerne må ta for å få mest mulig
                    poeng{' '}
                </Paragraph>
            </div>
            {suggestedTripData && startLocationName ? (
                <div className="bg-blue-90 flex flex-col max-w-lg rounded-md p-6 gap-2">
                    <div className="flex justify-between">
                        <Heading5>Fra {startLocationName}</Heading5>
                        <div className="flex">
                            <ClockIcon />
                            <Heading6>
                                Reisetid:{' '}
                                {suggestedTripData.tripPatterns[0].duration}
                            </Heading6>
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
