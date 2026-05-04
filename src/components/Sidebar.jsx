import { Link, useLocation } from 'react-router-dom'

const links = [
    { path: '/properties', label: 'Propiedades' },
    { path: '/owners', label: 'Propietarios' },
    { path: '/amenities', label: 'Amenidades' },
]

function Sidebar() {
    const location = useLocation()

    return (
        <aside className="w-52 flex flex-col flex-shrink-0" style={{ background: '#1e2235' }}>
            
            {/* Brand */}
            <div className="flex items-center gap-2 px-4 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#4f6ef7' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white"/>
                        <rect x="8" y="1" width="5" height="5" rx="1.5" fill="white"/>
                        <rect x="1" y="8" width="5" height="5" rx="1.5" fill="white"/>
                        <rect x="8" y="8" width="5" height="5" rx="1.5" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="text-white font-medium text-sm">FindRent</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Panel administrativo</div>
                </div>
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
                    CM
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>Carlos Mejía</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Administrador</div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar