'use client'
import { Heading1, LeadParagraph } from '@entur/typography'
import InactiveEventsList from '../components/InactiveEventsList'

const InactiveEventsPage: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col ml-40 mt-16">
            <Heading1 margin="none">Tidligere spill</Heading1>
            <LeadParagraph className="mb-20" margin="none">
                Oversikt over alle lagrede spill
            </LeadParagraph>
            <InactiveEventsList />
        </div>
    )
}

export default InactiveEventsPage
