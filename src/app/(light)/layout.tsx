import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import DarkLogo from '@/lib/assets/images/DarkLogo.png'

export default function LightModeLayout({
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
                        src={DarkLogo}
                        alt="entur partner"
                        width={215}
                        style={{ height: 'auto' }}
                        priority={true}
                    />
                </Link>
            </div>
            {children}
        </div>
    )
}
