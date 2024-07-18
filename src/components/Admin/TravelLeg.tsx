import { TravelTag } from '@entur/travel'
import { LegLinePicker, TransportIconPicker } from '@/lib/utils/transportMapper'
import { WalkIcon } from '@entur/icons'
import { SubParagraph } from '@entur/typography'
import { formatTimePlanner } from '@/lib/utils/dateFnsUtils'
import { Leg } from '@/lib/types/types'

type Props = {
    leg: Leg
    index: number
    array: Leg[]
}

export default function TravelLeg({ leg, index, array }: Props) {
    return (
        <li className="flex-grow">
            {index === array.length - 1 ? (
                <>
                    {leg.line ? (
                        <div className="flex items-center">
                            <TravelTag alert="none" transport={leg.mode}>
                                <TransportIconPicker transportType={leg.mode} />
                                {leg.line?.publicCode}
                            </TravelTag>
                            <LegLinePicker mode={leg.mode} />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <TravelTag>
                                <WalkIcon color="#181c56" />
                            </TravelTag>
                            <LegLinePicker />
                        </div>
                    )}
                </>
            ) : (
                <>
                    {leg.line ? (
                        <div className="flex items-center">
                            <TravelTag alert="none" transport={leg.mode}>
                                <TransportIconPicker transportType={leg.mode} />
                                {leg.line?.publicCode}
                            </TravelTag>
                            <LegLinePicker mode={leg.mode} />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <TravelTag>
                                <WalkIcon color="#8d8e9c" />
                            </TravelTag>
                            <LegLinePicker mode={leg.mode} />
                        </div>
                    )}
                </>
            )}
            <SubParagraph>
                {formatTimePlanner(leg.expectedStartTime)}
            </SubParagraph>
        </li>
    )
}
