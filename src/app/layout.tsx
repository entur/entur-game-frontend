import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
    title: 'Entur-spillet',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={`$colors-brand-blue flex flex-col w-screen min-h-screen`}
            >
                {children}
            </body>
        </html>
    )
}
