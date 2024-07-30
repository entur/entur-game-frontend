'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSession } from 'next-auth/react'
import { Loader } from '@entur/loader'

const ProtectedComponents = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading, login } = useAuth()
    const { status } = useSession()

    useEffect(() => {
        if (!loading && !isAuthenticated && status === 'unauthenticated') {
            login()
        }
    }, [loading, isAuthenticated, status])

    if (loading || status === 'loading') {
        return <Loader className="m-auto">Laster...</Loader>
    }

    return <>{children}</>
}

export default ProtectedComponents
