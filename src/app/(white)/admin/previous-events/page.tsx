'use client'
import { BlockquoteFooter, Heading1, LeadParagraph } from '@entur/typography'
import InactiveEventsList from '../components/InactiveEventsList'

const InactiveEventsPage: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col ml-40 mt-16">
            <BlockquoteFooter>Tidligere spill</BlockquoteFooter>
            <Heading1 margin="none">Se alle tidligere spill</Heading1>
            <LeadParagraph className="mb-10" margin="none">
                Oversikt over alle lagrede spill
            </LeadParagraph>
            <InactiveEventsList />
        </div>
    )
}

export default InactiveEventsPage
