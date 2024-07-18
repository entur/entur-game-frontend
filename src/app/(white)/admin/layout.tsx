import '@/app/globals.css'

import ProtectedComponents from '@/components/ProtectedComponents'
import { AdminNavBar } from './components/AdminNavBar'

export default function WhiteModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-white flex flex-col w-screen min-h-screen">
            <ProtectedComponents>
                <AdminNavBar />
                {children}
            </ProtectedComponents>
        </div>
    )
}
