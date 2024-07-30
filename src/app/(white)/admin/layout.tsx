import '@/app/globals.css'
import ProtectedComponents from '@/components/ProtectedComponents'
import { LoginProvider } from '@/app/providers/loginProvider'
import { AdminNavBar } from './components/AdminNavBar'

export default function WhiteModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <LoginProvider>
            <div className="bg-white flex flex-col w-screen min-h-screen">
                <ProtectedComponents>
                    <AdminNavBar />
                    {children}
                </ProtectedComponents>
            </div>
        </LoginProvider>
    )
}
