import '@/app/globals.css'
import { EnturToastProvider } from './providers'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <EnturToastProvider>
                <body
                    className={`bg-blue-main flex flex-col w-screen min-h-screen`}
                >
                    {children}
                </body>
            </EnturToastProvider>
        </html>
    )
}
