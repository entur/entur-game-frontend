import '@/app/globals.css'
import NavBar from '@/components/NavBar/NavBar'

export default function LightModeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="$colors-brand-white flex flex-col w-screen min-h-screen">
            <NavBar admin={true} />
            {children}
        </div>
    )
}
