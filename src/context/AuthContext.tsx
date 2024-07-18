import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react'
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
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const loading = status === 'loading'

    useEffect(() => {
        if (session) {
            setIsAuthenticated(true)
        } else if (session === null) {
            login()
        } else {
            setIsAuthenticated(false)
        }
    }, [session])

    const login = () => signIn('azure-ad')
    const logout = () => signOut()

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, loading, login, logout }}
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
