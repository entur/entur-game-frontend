import { TopNavigationItem } from '@entur/menu'
import { Link } from 'react-router-dom'

export const AdminNavBar: React.FC = () => {
    return (
        <nav className="flex flex-row items-center gap-14 p-8">
            <Link to="/create-journey">
                <TopNavigationItem>Opprett rute</TopNavigationItem>
            </Link>
            <Link to="/admin-leaderboard">
                <TopNavigationItem>Leaderboard</TopNavigationItem>
            </Link>
        </nav>
    )
}
