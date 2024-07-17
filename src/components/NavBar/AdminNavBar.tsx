'use client'

import { TopNavigationItem } from '@entur/menu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AdminLogoLight from '@/lib/assets/images/AdminLogoLight.png'
import AdminLogoDark from '@/lib/assets/images/AdminLogoDark.png'
import { Contrast } from '@entur/layout'
import { Heading5 } from '@entur/typography'
import { UserIcon } from '@entur/icons'

export const AdminNavBar: React.FC = () => {
    const path = usePathname()
    const isLandingPage = path.endsWith('/admin')

    const navigationBar = (
        <>
            <TopNavigationItem
                active={path.endsWith('/create-game')}
                href="/admin/create-game"
            >
                Opprett spill
            </TopNavigationItem>
            <TopNavigationItem
                active={path.endsWith('/leaderboard')}
                href="/admin/leaderboard" //TODO: endre til riktig page
            >
                Aktivt spill
            </TopNavigationItem>
            <TopNavigationItem
                active={path.endsWith('/leaderboard')}
                href="/admin/leaderboard" //TODO: endre til riktig page
            >
                Tidligere spill
            </TopNavigationItem>
        </>
    )
    return (
        <div
            className={`w-full ${isLandingPage ? 'bg-blue-main' : 'bg-white'}`}
        >
            <div className="flex items-center pt-10 pl-5 ">
                <Link href="/admin" className="mr-7">
                    <Image
                        className="cursor-pointer"
                        src={isLandingPage ? AdminLogoLight : AdminLogoDark}
                        alt="entur partner"
                        width={215}
                    />
                </Link>
                <nav className="flex flex-row items-center gap-14">
                    {isLandingPage ? (
                        <Contrast>{navigationBar}</Contrast>
                    ) : (
                        navigationBar
                    )}
                </nav>
            </div>
        </div>
    )
}
