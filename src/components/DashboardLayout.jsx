import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-col flex-1 min-w-0">

                <Header
                    onMenuClick={() => setSidebarOpen(prev => !prev)}
                />

                <main className="flex-1 overflow-auto bg-gray-50">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default DashboardLayout