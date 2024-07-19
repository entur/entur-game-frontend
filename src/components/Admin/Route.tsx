import { Heading5, Heading6 } from '@entur/typography'
import { ClockIcon, DestinationIcon } from '@entur/icons'
import { formatPlannerDuration } from '@/lib/utils/dateFnsUtils'
import TravelLeg from '@/components/Admin/TravelLeg'
import { generateKey } from '@/lib/utils/generateUniqueKey'
import { TravelTag } from '@entur/travel'
import { Trip } from '@/lib/types/types'

type Props = {
    startLocationName: string
    suggestedTripData: Trip
}

export default function Route({ startLocationName, suggestedTripData }: Props) {
    return (
        <div className="bg-blue-90 flex flex-col max-w-fit min-w-[500px] rounded-md p-6 gap-2">
            <div className="flex justify-between">
                <Heading5 margin="none">Fra {startLocationName}</Heading5>
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
                            <TravelLeg
                                key={generateKey(
                                    leg.id || leg.expectedStartTime,
                                )}
                                leg={leg}
                                index={index}
                                array={array}
                            />
                        ),
                    )}
                </ul>
                <TravelTag>
                    <DestinationIcon />
                </TravelTag>
            </div>
        </div>
    )
}
