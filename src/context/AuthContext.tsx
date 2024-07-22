import React, { createContext, useContext, ReactNode } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface AuthContextType {
    isAuthenticated: boolean
    loading: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const login = () => {
        signIn('azure-ad', undefined, {
            prompt: 'login',
        })
    }
    const logout = () => {
        signOut({ callbackUrl: '/admin' })
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!session, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
