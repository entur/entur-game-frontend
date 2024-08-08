'use client'

import { AuthProvider } from '@/context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

/*
 * This provider wraps the AuthProvider and the SessionProvider to provide a
 */
export function LoginProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
    )
}
