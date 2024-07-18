import { LegLine, TravelTag } from '@entur/travel'
import { TransportIconPicker } from '@/lib/utils/transportMapper'
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
        <>
            {index === array.length - 1 ? (
                <li className="flex-grow">
                    {leg.line ? (
                        <div className="flex items-center">
                            <TravelTag alert="none" transport={leg.mode}>
                                <TransportIconPicker transportType={leg.mode} />
                                {leg.line?.publicCode}
                            </TravelTag>
                            <LegLine
                                direction="horizontal"
                                pattern="line"
                                color="#E3E6E8"
                            ></LegLine>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <TravelTag>
                                <WalkIcon color="#8d8e9c" />
                            </TravelTag>
                            <LegLine
                                direction="horizontal"
                                pattern="dotted"
                                color="#E3E6E8"
                            ></LegLine>
                        </div>
                    )}
                    <SubParagraph>
                        {formatTimePlanner(leg.expectedStartTime)}
                    </SubParagraph>
                </li>
            ) : (
                <li>
                    {leg.line ? (
                        <div className="flex items-center">
                            <TravelTag alert="none" transport={leg.mode}>
                                <TransportIconPicker transportType={leg.mode} />
                                {leg.line?.publicCode}
                            </TravelTag>

                            <LegLine
                                style={{
                                    minWidth: '1.5rem',
                                    backgroundColor: '#E3E6E8',
                                }}
                                direction="horizontal"
                                pattern="line"
                                color="#E3E6E8"
                            ></LegLine>
                        </div>
                    ) : (
                        <div className="flex items-center flex-grow">
                            <TravelTag>
                                <WalkIcon color="#8d8e9c" />
                            </TravelTag>
                            <div className="inline-block overflow-hidden">
                                <LegLine
                                    style={{
                                        minWidth: '1.5rem',
                                        backgroundColor: '#E3E6E8',
                                        flexGrow: 1,
                                    }}
                                    direction="horizontal"
                                    pattern="dotted"
                                    color="#E3E6E8"
                                ></LegLine>
                            </div>
                        </div>
                    )}
                    <SubParagraph>
                        {formatTimePlanner(leg.expectedStartTime)}
                    </SubParagraph>
                </li>
            )}
        </>
    )
}
