import { Maybe, Trip } from '@/lib/types/types'
import { Heading3, Paragraph } from '@entur/typography'
import { Badge } from '@entur/layout'
import Route from '@/components/Admin/Route'

type Props = {
    suggestedTripData: Maybe<Trip>
    startLocationName: Maybe<string>
}

export default function RouteSuggestion({
    suggestedTripData,
    startLocationName,
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
            {suggestedTripData?.tripPatterns && startLocationName ? (
                <Route
                    startLocationName={startLocationName}
                    suggestedTripData={suggestedTripData}
                />
            ) : (
                <Badge variant="neutral" type="status">
                    Ingen rute valgt
                </Badge>
            )}
        </div>
    )
}
