import '@/app/globals.css'
import NavBar from '@/components/NavBar/NavBar'

export default function DarkModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-blue-90 flex flex-col w-screen min-h-screen">
            <NavBar admin={true} />
            {children}
        </div>
    )
}
