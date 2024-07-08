import '@/app/globals.css'
import NavBar from '@/components/NavBar/NavBar'

export default function WhiteModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-white flex flex-col w-screen min-h-screen">
            <NavBar admin={true} />
            {children}
        </div>
    )
}
