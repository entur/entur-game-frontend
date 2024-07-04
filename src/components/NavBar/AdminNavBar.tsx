'use client'

import { TopNavigationItem } from '@entur/menu'

export const AdminNavBar: React.FC = () => {
    return (
        <nav className="flex flex-row items-center gap-14">
            <TopNavigationItem href="/admin/create-journey">
                Opprett rute
            </TopNavigationItem>
            <TopNavigationItem href="/admin/leaderboard">
                Leaderboard
            </TopNavigationItem>
        </nav>
    )
}
