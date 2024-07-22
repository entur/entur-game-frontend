import { isEmptyTrip, Maybe, Trip } from '@/lib/types/types'
import { Heading3, Paragraph } from '@entur/typography'
import { Badge } from '@entur/layout'
import Route from '@/components/Admin/Route'
import { Loader } from '@entur/loader'
import { BannerAlertBox } from '@entur/alert'

type Props = {
    suggestedTripData: Maybe<Trip>
    startLocationName: Maybe<string>
    isLoading: boolean
    error: Maybe<Error>
}

export default function RouteSuggestion({
    suggestedTripData,
    startLocationName,
    isLoading,
    error,
}: Props) {
    return (
        <div>
            <div className="flex flex-col pt-12 mb-4">
                <Heading3>Optimal fremkomstmåte for valgt rute</Heading3>
                <Paragraph margin="none">
                    Dette er fremkomstmåten spillerne må ta for å få maksimal
                    poengsum
                </Paragraph>
            </div>
            {isLoading ? (
                <Loader>Laster inn rute...</Loader>
            ) : error ? (
                <BannerAlertBox
                    className="w-fit"
                    title="Error"
                    variant="negative"
                >
                    En ukjent feil har oppstått
                </BannerAlertBox>
            ) : suggestedTripData &&
              suggestedTripData?.tripPatterns?.length > 0 &&
              startLocationName ? (
                <Route
                    startLocationName={startLocationName}
                    suggestedTripData={suggestedTripData}
                />
            ) : isEmptyTrip(suggestedTripData) ? (
                <BannerAlertBox
                    className="w-fit"
                    title="Ingen rute funnet"
                    variant="negative"
                >
                    Ingen rute ble funnet. Velg et annet tidspunkt for å
                    opprette spill.
                </BannerAlertBox>
            ) : (
                <Badge variant="neutral" type="status">
                    Ingen rute valgt
                </Badge>
            )}
        </div>
    )
}
