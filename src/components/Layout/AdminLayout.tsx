import React, {ReactNode} from 'react'
import BackgroundComponent from '../BackgroundComponent'
import { AdminNavBar } from '../NavBar/AdminNavBar'

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex ">
            <div className="flex items-center bg-gray-100">
                <BackgroundComponent>
                    <AdminNavBar></AdminNavBar>
                </BackgroundComponent> 
            </div>
            <div className="flex-1 p-4">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout