import { useEffect, useState } from 'react'
import { propertiesService } from '../services/properties.service'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import PropertyModal from '../components/PropertyModal'

function PropertiesPage() {

    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingProperty, setEditingProperty] = useState(null)
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [activeProperty, setActiveProperty] = useState(null) // propiedad seleccionada en el panel
    const [filters, setFilters] = useState({ city: '', min_price: '', max_price: '', bedrooms: '', bathrooms: '', operation_type: ''})
    const [appliedFilters, setAppliedFilters] = useState({ city: '', min_price: '', max_price: '', bedrooms: '', bathrooms: '', operation_type: ''})


    const handleSearch = () => {
    setCurrentPage(1)
    setAppliedFilters(filters)
    }

    const showToast = (message, type = 'success') => {
            setToast({ isVisible: true, message, type })
        }
    
    const handleCancel = () => {
        setConfirmOpen(false)
    }

    const handleDeleteClick = (property) => {
        setConfirmOpen(true)
        setSelectedProperty(property)
    }

    const handleConfirmDelete = () => {
        propertiesService.remove(selectedProperty.id)
            .then(() => {
                setProperties(properties.filter(o => o.id !== selectedProperty.id))
                setConfirmOpen(false)
                showToast(`"${selectedProperty.title}" eliminado correctamente`)
            })
            .catch(() => {
                setConfirmOpen(false)
                showToast('No se pudo eliminar la propiedad', 'error')
            })
    }

    const handleNewClick = () => {
        setModalOpen(true)
        setEditingProperty(null)
    }

    const handleEditClick = (property) => {
        setModalOpen(true)
        setEditingProperty(property)
    }

    const handleSubmit = (formData) => {

        const { amenities, ...propertyData } = formData
        const amenityIds = amenities.map(a => a.id)
        

        if (editingProperty) {
            propertiesService.update(editingProperty.id, propertyData)
                .then(() => {
                    // Eliminar amenidades actuales
                    const removePromises = (editingProperty.amenities || []).map(a =>
                        propertiesService.removeAmenity(editingProperty.id, a.id)
                    )
                    return Promise.all(removePromises)
                })
                .then(() => {
                    // Agregar las nuevas
                    if (amenityIds.length > 0) {
                        return propertiesService.addAmenities(editingProperty.id, amenityIds)
                    }
                })
                .then(() => propertiesService.getById(editingProperty.id))
                .then((updated) => {
                    setProperties(properties.map(o => o.id === editingProperty.id ? updated : o))
                    setActiveProperty(updated)
                    setModalOpen(false)
                    showToast(`"${editingProperty.title}" actualizado correctamente`)
                })
                .catch((err) => {
                    showToast(err.message || 'Error al actualizar la propiedad', 'error')
                })
        } else {
            propertiesService.create(propertyData)
                .then((newProperty) => {
                    if (amenityIds.length > 0) {
                        return propertiesService.addAmenities(newProperty.id, amenityIds)
                            .then(() => propertiesService.getById(newProperty.id))
                    }
                    return newProperty
                })
                .then((newProperty) => {
                    setProperties([...properties, newProperty])
                    setModalOpen(false)
                    showToast(`"${formData.title}" creado correctamente`)
                })
                .catch((err) => {
                    showToast(err.message || 'Error al crear la propiedad', 'error')
                })
        }
    }

    const handlePropertyClick = (property) => {
        propertiesService.getById(property.id)
            .then(detail => setActiveProperty(detail))
    }

    const totalCount = properties.length
    const activeCount = properties.filter(p => p.is_active == true).length
    const avgPrice = properties.length > 0
        ? properties.reduce((sum, p) => sum + parseFloat(p.price), 0) / properties.length
        : 0
    const uniqueCities = [...new Set(properties.map(p => p.city))].length


    useEffect(() => {
        propertiesService.getAll(currentPage, appliedFilters)
            .then(response => {
                setProperties(response.data)
                setTotalPages(response.totalPages)
            })
            .catch(() => setError('No se pudieron cargar las propiedades'))
            .finally(() => setLoading(false))
    }, [currentPage,appliedFilters])

    if (loading) return <p className="p-6 text-gray-500">Cargando...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Propiedades
                    <span className="ml-2 text-sm font-normal text-gray-500">
                        {totalCount} registros
                    </span>
                </h1>
                <button
                    onClick={handleNewClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                    + Nueva propiedad
                </button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Activas</p>
                    <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Precio promedio</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ${(avgPrice / 1000000).toFixed(1)}M
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ciudades</p>
                    <p className="text-2xl font-bold text-gray-900">{uniqueCities}</p>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 items-end">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ciudad</p>
                        <input
                            value={filters.city}
                            onChange={e => setFilters({ ...filters, city: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Medellín"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Precio mín</p>
                        <input
                            value={filters.min_price}
                            onChange={e => setFilters({ ...filters, min_price: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 1000000"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Precio máx</p>
                        <input
                            value={filters.max_price}
                            onChange={e => setFilters({ ...filters, max_price: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 5000000"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Habitaciones</p>
                        <input
                            value={filters.bedrooms}
                            onChange={e => setFilters({ ...filters, bedrooms: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 2"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Baños</p>
                        <input
                            value={filters.bathrooms}
                            onChange={e => setFilters({ ...filters, bathrooms: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 1"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                            Operación
                        </p>

                        <select
                            value={filters.operation_type}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    operation_type: e.target.value
                                })
                            }
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Todas</option>
                            <option value="SALE">Venta</option>
                            <option value="RENT">Arriendo</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* Layout principal */}
            <div className={`grid gap-6 ${activeProperty ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>

                {/* Lista de cards */}
                <div className="flex flex-col gap-3">
                    {properties.map(property => (
                        <div
                            key={property.id}
                            onClick={() => handlePropertyClick(property)}
                            className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                activeProperty?.id === property.id
                                    ? 'border-blue-500 shadow-md shadow-blue-100'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className={`h-1 ${activeProperty?.id === property.id ? 'bg-gradient-to-r from-blue-500 to-indigo-400' : 'bg-gray-100'}`} />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-semibold text-gray-900">{property.title}</p>

                                    <div className="flex gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                                                property.operation_type === 'SALE'
                                                    ? 'bg-orange-100 text-orange-700 border-orange-300'
                                                    : 'bg-blue-100 text-blue-700 border-blue-300'
                                            }`}
                                        >

                                            {property.operation_type === 'SALE'
                                                ? 'Venta'
                                                : 'Arriendo'}
                                        </span>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                property.is_active
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-red-50 text-red-600'
                                            }`}
                                        >
                                            {property.is_active ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">
                                    📍 {property.city} · {property.bedrooms} hab · {property.bathrooms} baños · {property.area_m2}m²
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-bold text-blue-600">
                                        ${property.price.toLocaleString('es-CO')}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {activeProperty?.id === property.id ? 'Seleccionada ▶' : 'Ver detalle ▶'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Página {currentPage} de {totalPages}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="text-sm border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 disabled:opacity-40"
                                >‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`text-sm border px-3 py-1 rounded-md ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >{page}</button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="text-sm border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 disabled:opacity-40"
                                >›</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Panel de detalle */}
                {activeProperty && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                            onClick={() => setActiveProperty(null)}
                        />
                        <div className="fixed bottom-0 left-0 right-0 z-30 max-h-[70vh] overflow-y-auto rounded-t-2xl lg:static lg:z-auto lg:rounded-xl lg:max-h-none lg:overflow-visible bg-white border border-gray-200 lg:h-fit lg:sticky lg:top-6">
                            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-400" />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">{activeProperty.title}</h2>
                                        <p className="text-sm text-gray-500">📍 {activeProperty.address} · {activeProperty.city}</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveProperty(null)}
                                        className="text-gray-400 hover:text-gray-600 text-lg"
                                    >✕</button>
                                </div>

                                <p className="text-3xl font-extrabold text-blue-600 mb-5">
                                    ${activeProperty.price.toLocaleString('es-CO')}
                                    <span className="text-sm font-normal text-gray-400 ml-1">/ mes</span>
                                </p>

                                <div className="grid grid-cols-3 gap-3 mb-5">
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-gray-900">{activeProperty.bedrooms}</p>
                                        <p className="text-xs text-gray-400">Habitaciones</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-gray-900">{activeProperty.bathrooms}</p>
                                        <p className="text-xs text-gray-400">Baños</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-gray-900">{activeProperty.area_m2}</p>
                                        <p className="text-xs text-gray-400">m²</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Propietario</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {activeProperty.owner?.full_name} {activeProperty.owner?.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estado</p>
                                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                                            {activeProperty.is_active ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                            Tipo de Operación
                                        </p>

                                        <span
                                            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                                                activeProperty.operation_type === 'SALE'
                                                    ? 'bg-orange-100 text-orange-700 border-orange-300'
                                                    : 'bg-blue-100 text-blue-700 border-blue-300'
                                            }`}
                                        >

                                            {activeProperty.operation_type === 'SALE'
                                                ? 'Venta'
                                                : 'Arriendo'}
                                        </span>
                                    </div>                                    
                                </div>

                                {activeProperty.description && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Descripción</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{activeProperty.description}</p>
                                    </div>
                                )}

                                {activeProperty.amenities?.length > 0 && (
                                    <div className="mb-5">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Amenidades</p>
                                        <div className="flex flex-wrap gap-2">
                                            {activeProperty.amenities.map(a => (
                                                <span key={a.id} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                                                    {a.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEditClick(activeProperty)}
                                        className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
                                    >✎ Editar</button>
                                    <button
                                        onClick={() => handleDeleteClick(activeProperty)}
                                        className="flex-1 border border-red-200 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50"
                                    >✕ Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ConfirmDialog
                isOpen={confirmOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
                message={`¿Eliminar "${selectedProperty?.title}"?`}
            />
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(t => ({ ...t, isVisible: false }))}
            />
            <PropertyModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                property={editingProperty}
            />
        </div>
    )
}

export default PropertiesPage