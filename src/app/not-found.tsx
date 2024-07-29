import { Heading1, LeadParagraph } from '@entur/typography'

export default function NotFound() {
    return (
        <div className="m-auto flex gap-5 text-white items-center">
            <Heading1 className="m-0 px-[23px] text-white border-r">
                404
            </Heading1>
            <LeadParagraph className="text-white">
                Her var det ingenting!
            </LeadParagraph>
        </div>
    )
}
