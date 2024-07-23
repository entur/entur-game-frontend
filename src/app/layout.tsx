import '@/app/globals.css'
import { EnturToastProvider } from './providers/toastProvider'
import { LoginProvider } from './providers/loginProvider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <LoginProvider>
                <body
                    className={`bg-blue-main flex flex-col w-screen min-h-screen`}
                >
                    <EnturToastProvider>{children}</EnturToastProvider>
                </body>
            </LoginProvider>
        </html>
    )
}
