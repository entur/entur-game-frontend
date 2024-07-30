import '@/app/globals.css'
import LightLogo from '@/lib/assets/images/LightLogo.png'
import Link from 'next/link'
import Image from 'next/image'

export default function DarkModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-blue-main flex flex-col w-screen min-h-screen">
            <Link href="/" className="pt-5 ml-5 mr-20">
                <Image
                    className="cursor-pointer"
                    src={LightLogo}
                    alt="entur partner"
                    width={215}
                    style={{ height: 'auto' }}
                    priority={true}
                />
            </Link>
            {children}
        </div>
    )
}
