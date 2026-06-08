import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ownersService } from '../services/owners.service'
import { propertiesService } from '../services/properties.service'
import { amenitiesService } from '../services/amenities.service'

function HomePage() {
    const [stats, setStats] = useState({ properties: 0, owners: 0, amenities: 0, cities: 0 })

    useEffect(() => {
        async function loadStats() {
            try {
                const [propertiesRes, ownersRes, amenitiesRes] = await Promise.all([
                    propertiesService.getAll(),
                    ownersService.getAll(),
                    amenitiesService.getAll()
                ])
                const properties = propertiesRes.data || []
                const uniqueCities = [...new Set(properties.map(p => p.city))]
                setStats({
                    properties: propertiesRes.total || properties.length,
                    owners: ownersRes.total || (ownersRes.data || []).length,
                    amenities: (amenitiesRes || []).length,
                    cities: uniqueCities.length
                })
            } catch (error) {
                console.error('Error loading stats:', error)
            }
        }
        loadStats()
    }, [])

    const features = [
        { title: 'Geolocalización automática', desc: 'Coordenadas desde ciudad y dirección vía OpenStreetMap.' },
        { title: 'Filtros avanzados', desc: 'Ciudad, precio, habitaciones, baños y tipo de operación.' },
        { title: 'Paginación backend', desc: 'Consultas eficientes con limit y offset en PostgreSQL.' },
        { title: 'Relación many-to-many', desc: 'Propiedades y amenidades vía tabla pivote.' },
        { title: 'Documentación Swagger', desc: 'API documentada con OpenAPI 3.0.' },
    ]

    const techs = ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'Knex.js', 'Swagger']

    const modules = [
        { to: '/properties', icon: '🏢', title: 'Propiedades', desc: 'Listado, creación, edición y eliminación. Filtros por ciudad, precio y habitaciones. Panel de detalle con mapa.', color: 'bg-blue-50 text-blue-600' },
        { to: '/owners', icon: '👥', title: 'Propietarios', desc: 'Gestión completa con validación de documentos únicos. Tabla con paginación.', color: 'bg-green-50 text-green-600' },
        { to: '/amenities', icon: '⭐', title: 'Amenidades', desc: 'Catálogo de amenidades asociadas a propiedades mediante relación muchos a muchos.', color: 'bg-amber-50 text-amber-600' },
    ]

    return (
        <div className="p-6 space-y-5">

            {/* Hero */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider mb-5">
                    Panel administrativo
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                    Bienvenido a <span style={{ color: '#4f6ef7' }}>FindRent</span>
                </h1>
                <p className="text-base text-slate-500 max-w-2xl leading-relaxed mb-2">
                    Sistema de administración inmobiliaria para gestionar propiedades,
                    propietarios y amenidades desde una interfaz moderna y responsiva.
                </p>
                <p className="text-sm text-slate-400 mb-7">
                    React · Node.js · Express · PostgreSQL · Knex.js
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: '#4f6ef7' }}>
                        MV
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Miguel Angel Viloria Sierra</p>
                        <p className="text-xs text-slate-400">Desarrollador Full Stack · Proyecto de portafolio</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Propiedades', value: stats.properties },
                    { label: 'Propietarios', value: stats.owners },
                    { label: 'Amenidades', value: stats.amenities },
                    { label: 'Ciudades', value: stats.cities },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                        <p className="text-4xl font-bold" style={{ color: '#4f6ef7' }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Módulos */}
            <div className="grid md:grid-cols-3 gap-4">
                {modules.map(m => (
                    <Link
                        key={m.to}
                        to={m.to}
                        className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 ${m.color}`}>
                            {m.icon}
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 mb-2">{m.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{m.desc}</p>
                        <span className="text-sm font-medium" style={{ color: '#4f6ef7' }}>Ir al módulo →</span>
                    </Link>
                ))}
            </div>

            {/* Features + Stack */}
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Funcionalidades destacadas</h2>
                    <div className="space-y-3">
                        {features.map(f => (
                            <div key={f.title} className="flex gap-3 items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#4f6ef7' }}></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{f.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Stack tecnológico</h2>
                    <div className="grid grid-cols-4 gap-2 mb-5">
                        {techs.map(t => (
                            <div key={t} className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center text-xs font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                                {t}
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-slate-700 mb-2">Arquitectura backend</p>
                        <p className="text-xs text-slate-400 leading-loose">
                            Routes → Controllers → Services → DB<br/>
                            REST API · Paginación · Filtros · Swagger
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4 border-t border-gray-100">
                <p className="text-sm font-medium text-slate-700">FindRent</p>
                <p className="text-xs text-gray-400 mt-1">Miguel Angel Viloria Sierra · React · Node.js · PostgreSQL</p>
            </div>

        </div>
    )
}

export default HomePage