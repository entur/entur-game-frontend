import React, { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedComponents = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <div>You are not authorized to view this content.</div>
    }

    return <>{children}</>
}

export default ProtectedComponents
