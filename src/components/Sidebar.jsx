import { Link, useLocation } from 'react-router-dom'

const links = [
    { path: '/', label: 'Inicio' },
    { path: '/properties', label: 'Propiedades' },
    { path: '/owners', label: 'Propietarios' },
    { path: '/amenities', label: 'Amenidades' },
]

function Sidebar({ isOpen, onClose }) {
    const location = useLocation()

    return (
        <>
            {/* Overlay oscuro en mobile cuando está abierto */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-52 flex flex-col flex-shrink-0
                    transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                style={{ background: '#1e2235' }}
            >
                {/* Brand */}
                
                <div className="flex items-center px-4 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
                    <img src="/findrent-logo-dark.svg" alt="FindRent" className="h-9" />
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-4">
                    <p className="text-xs px-2 mb-2 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Gestión
                    </p>
                    {links.map(link => {
                        const isActive = location.pathname === link.path
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={onClose}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-1 text-sm transition-colors"
                                style={{
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                    fontWeight: isActive ? '500' : '400',
                                    background: isActive ? 'rgba(79,110,247,0.15)' : 'transparent',
                                    borderLeft: isActive ? '2px solid #4f6ef7' : '2px solid transparent',
                                }}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Usuario */}
                <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-white" style={{ background: '#4f6ef7' }}>
                        FR
                    </div>

                    <div className="min-w-0 flex-1">
                        <div
                            className="text-xs truncate"
                            style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                            FindRent
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                            Dashboard Demo
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar