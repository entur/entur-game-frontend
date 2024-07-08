import '@/app/globals.css'
import EnturPartnerIconLight from '@/lib/assets/icons/EnturPartnerLight.svg'
import Link from 'next/link'
import Image from 'next/image'

export default function DarkModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-blue-main flex flex-col w-screen min-h-screen">
            <Link href="/" className="pt-10 ml-5 mr-20">
                <Image
                    className="cursor-pointer"
                    src={EnturPartnerIconLight}
                    alt="entur partner"
                />
            </Link>
            {children}
        </div>
    )
}