import { useEffect, useState } from 'react'
import { amenitiesService } from '../services/amenities.service'
import  ConfirmDialog  from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import AmenityModal from '../components/AmenityModal'

function AmenitiesPage() {
    const [amenities, setAmenities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedAmenity, setSelectedAmenity] = useState(null)
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
    const [modalOpen, setModalOpen] = useState(false)
    const [editingAmenity, setEditingAmenity] = useState(null)
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

    const handleNewClick = () => {
        setModalOpen(true)
        setEditingAmenity(null)
    }
    
    const handleEditClick = (amenity) => {
        setModalOpen(true)
        setEditingAmenity(amenity)
    }

    const handleSubmit = (formData) => {
        if (editingAmenity) {
            amenitiesService.update(editingAmenity.id, formData)
            .then(() => {
            setAmenities(amenities.map(a => a.id === editingAmenity.id ? { ...a, ...formData } : a))
            setModalOpen(false)
            showToast(`"${editingAmenity.name}" Edita correctamente`)
        })
        } else {
            amenitiesService.create(formData)
                .then((newAmenity) => {
                    setAmenities([...amenities, newAmenity])
                    setModalOpen(false)
                    showToast(`"${formData.name}" Creada correctamente`)
                })
        }
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
                <button onClick={handleNewClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    + Nueva amenidad
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Header de la caja */}
                <div className="flex px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Nombre / Descripción
                    </span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Acciones
                    </span>
                </div>

                {/* Filas */}
                {amenities.map((amenity, index) => (
                    <div
                        key={amenity.id}
                        className={`flex items-center gap-3 px-4 py-3 ${
                            index < amenities.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <div className="flex-1">
                            <span className="font-medium text-sm text-gray-900">{amenity.name}</span>
                            <span className="text-xs text-gray-500 ml-2">{amenity.description}</span>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleEditClick(amenity)}
                                className="text-xs border border-gray-200 text-gray-500 px-3 py-1 rounded-md hover:bg-gray-50">
                                ✎ Editar
                            </button>
                            <button
                                onClick={() => handleDeleteClick(amenity)}
                                className="text-xs border border-red-200 text-red-500 px-3 py-1 rounded-md hover:bg-red-50"
                            >
                                ✕ Eliminar
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
            <AmenityModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                amenity={editingAmenity}
            />
        </div>
    )
}

export default AmenitiesPage