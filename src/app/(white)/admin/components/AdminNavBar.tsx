'use client'

import { TopNavigationItem } from '@entur/menu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AdminLogoLight from '@/lib/assets/images/AdminLogoLight.png'
import AdminLogoDark from '@/lib/assets/images/AdminLogoDark.png'
import { Contrast } from '@entur/layout'
import { Button, IconButton } from '@entur/button'
import { useAuth } from '@/context/AuthContext'
import { UserIcon } from '@entur/icons'

export const AdminNavBar: React.FC = () => {
    const path = usePathname()
    const isLandingPage = path.endsWith('/admin')
    const { logout } = useAuth()
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
                href="/admin/leaderboard"
            >
                Aktivt spill
            </TopNavigationItem>
            <TopNavigationItem
                active={path.endsWith('/leaderboard')}
                href="/admin/previous-events"
            >
                Tidligere spill
            </TopNavigationItem>
        </>
    )
    return (
        <div className={`${isLandingPage ? 'bg-blue-main' : 'bg-white'}`}>
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
                <div className="ml-auto pr-5">
                    <Button variant={'primary'} onClick={logout}>
                        <UserIcon className="inline align-baseline" />
                        Logg ut
                    </Button>
                </div>
            </div>
        </div>
    )
}
