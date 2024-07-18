'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSession } from 'next-auth/react'

const ProtectedComponents = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading, login } = useAuth()
    const { status } = useSession()

    useEffect(() => {
        if (!loading && !isAuthenticated && status === 'unauthenticated') {
            login()
        }
    }, [loading, isAuthenticated, status])

    if (loading || status === 'loading') {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <div>You are not authorized to view this content.</div>
    }

    return <>{children}</>
}

export default ProtectedComponents
