import { useEffect, useState } from 'react'
import { amenitiesService } from '../services/amenities.service'
import  ConfirmDialog  from '../components/ConfirmDialog'
import Toast from '../components/Toast'

function AmenitiesPage() {
    const [amenities, setAmenities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedAmenity, setSelectedAmenity] = useState(null)
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

    const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type })
    }

    const handleDeleteClick = (amenity) => {
        setConfirmOpen(true)
        setSelectedAmenity(amenity) 
    }

    const handleCancel = () => {
    setConfirmOpen(false)
    }   

    const handleConfirmDelete = () => {
        amenitiesService.remove(selectedAmenity.id)
            .then(() => {
            setAmenities(amenities.filter(a => a.id !== selectedAmenity.id))
            setConfirmOpen(false)
            showToast(`"${selectedAmenity.name}" Eliminada correctamente`)
        })
        .catch(() => {
            setConfirmOpen(false)
            showToast('No se puede eliminar porque está en uso', 'error')
        })
    }

    useEffect(() => {
        amenitiesService.getAll()
        .then(data => setAmenities(data))
        .catch(() => setError('No se pudieron cargar las amenidades'))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="p-6 text-gray-500">Cargando...</p>
    if (error)   return <p className="p-6 text-red-500">{error}</p>

    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Amenidades
                    <span className="ml-2 text-sm font-normal text-gray-500">
                        {amenities.length} registros
                    </span>
                </h1>
                <button className="border px-4 py-2 rounded text-sm hover:bg-gray-50">
                    + Nueva amenidad
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                {amenities.map(amenity => (
                    <div
                        key={amenity.id}
                        className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <div>
                            <p className="font-medium text-sm">{amenity.name}</p>
                            <p className="text-xs text-gray-500">{amenity.description}</p>
                        </div>
                        <div className="ml-4 flex gap-2">
                            <button className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
                                ✎
                            </button>
                            
                            <button 
                            onClick={() => handleDeleteClick(amenity)}
                            className="text-xs border border-red-200 text-red-500 px-2 py-1 rounded hover:bg-red-50">
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDialog
                isOpen={confirmOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
                message={`¿Eliminar "${selectedAmenity?.name}"?`}
            />
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(t => ({ ...t, isVisible: false }))}
            />
        </div>
    )
}

export default AmenitiesPage