import '@/app/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { EnturToastProvider } from './providers/toastProvider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={`bg-blue-main flex flex-col w-screen min-h-screen`}
            >
                <EnturToastProvider>{children}</EnturToastProvider>
            </body>
        </html>
    )
}
