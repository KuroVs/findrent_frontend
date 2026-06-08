import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import OwnersPage from './pages/OwnersPage'
import AmenitiesPage from './pages/AmenitiesPage'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/owners" element={<OwnersPage />} />
              <Route path="/amenities" element={<AmenitiesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App