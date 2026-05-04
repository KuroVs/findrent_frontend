import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PropertiesPage from './pages/PropertiesPage'
import OwnersPage from './pages/OwnersPage'
import AmenitiesPage from './pages/AmenitiesPage'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/properties" />} />
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