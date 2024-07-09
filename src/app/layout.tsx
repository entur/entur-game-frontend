'use client'

import '@/app/globals.css'
import { ToastProvider } from '@entur/alert'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ToastProvider>
                <body
                    className={`bg-blue-main flex flex-col w-screen min-h-screen`}
                >
                    {children}
                </body>
            </ToastProvider>
        </html>
    )
}
