'use client'

import { TopNavigationItem } from '@entur/menu'
import { usePathname } from 'next/navigation'

export const AdminNavBar: React.FC = () => {
    const path = usePathname()
    return (
        <nav className="flex flex-row items-center gap-14">
            <TopNavigationItem
                active={path.endsWith('/create-journey')}
                href="/admin/create-journey"
            >
                Opprett rute
            </TopNavigationItem>
            <TopNavigationItem
                active={path.endsWith('/leaderboard')}
                href="/admin/leaderboard"
            >
                Leaderboard
            </TopNavigationItem>
        </nav>
    )
}
