'use client'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'
import { Contrast } from '@entur/layout'
import { usePathname } from 'next/navigation'

export default function NavBar({ admin = false }: { admin: boolean }) {
    const path = usePathname()
    const isLandingPage = path.endsWith('/admin')
    const backgroundColor = isLandingPage ? 'bg-blue-main' : 'bg-white'

    return (
        <Contrast>
            <div
                className={`flex items-center pt-10 pb-12 ml-5 pl-12 ${backgroundColor}`}
            >
                {admin && <AdminNavBar />}
            </div>
        </Contrast>
    )
}
