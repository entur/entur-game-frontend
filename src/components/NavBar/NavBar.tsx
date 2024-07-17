'use client'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

export default function NavBar({ admin = false }: { admin: boolean }) {
    return <div className={`flex items-center`}>{admin && <AdminNavBar />}</div>
}
