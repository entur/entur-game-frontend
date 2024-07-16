
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

export default function NavBar({ admin = false }: { admin: boolean }) {
    return (
        <div className="flex items-center pt-10 pb-12 ml-5 pl-12">
            {admin && <AdminNavBar />}
        </div>
    )
}
