'use client'

import { AuthProvider } from '@/context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export function LoginProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
    )
}
