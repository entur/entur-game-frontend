import { TopNavigationItem } from "@entur/menu";
import { Link } from "react-router-dom";

export const AdminNavBar: React.FC = () => {
    return(
        <nav className="p-4">
            <Link to="/create-journey">
                <TopNavigationItem>
                    Opprett rute
                </TopNavigationItem>
            </Link>
            <Link to="/admin-leaderboard">
                <TopNavigationItem>
                    Leaderboard
                </TopNavigationItem>
            </Link>
        </nav>
    )
}