'use client';

import '@/app/globals.css'


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
                {children}
            </body>
        </html>
    )
}
