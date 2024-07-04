import '@/app/globals.css'
import EnturPartnerIconDark from '@/lib/assets/icons/EnturPartnerDark.svg'
import Link from 'next/link'
import Image from 'next/image'

export default function DarkModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-blue-90 flex flex-col w-screen min-h-screen">
            <div className="flex items-center pt-10 ml-5">
                <Link href="/" className="mr-20">
                    <Image
                        className="cursor-pointer"
                        src={EnturPartnerIconDark}
                        alt="entur partner"
                    />
                </Link>
            </div>
            {children}
        </div>
    )
}
