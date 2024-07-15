import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedComponents = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading, login } = useAuth()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            login()
        }
    }, [isAuthenticated, loading])

    if (loading || !isAuthenticated) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default ProtectedComponents
