import { useEffect, useState } from 'react'
import { ownersService } from '../services/owners.service'
import  ConfirmDialog  from '../components/ConfirmDialog'
import Toast from '../components/Toast'


function OwnersPage() {

    const [owners, setOwners] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingOwner, setEditingOwner] = useState(null)
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type })
    }

    const handleCancel = () => {
        setConfirmOpen(false)
        }
    
    const handleDeleteClick = (owner) => {
        setConfirmOpen(true)
        setSelectedOwner(owner) 
    }
    
    const handleConfirmDelete = () => {
        ownersService.remove(selectedOwner.id)
            .then(() => {
            setOwners(owners.filter(a => a.id !== selectedOwner.id))
            setConfirmOpen(false)
            showToast(`"${selectedOwner.full_name}" Eliminada correctamente`)
        })
        .catch(() => {
            setConfirmOpen(false)
            showToast('No se puede eliminar porque está en uso', 'error')
        })
    }

    useEffect(() => {
        ownersService.getAll(currentPage)
            .then(response => {
                console.log(response)
                setOwners(response.data)
                setTotalPages(response.totalPages)
            })
            .catch(() => setError('No se pudieron cargar los propietarios'))
            .finally(() => setLoading(false))
    }, [currentPage])

    if (loading) return <p className="p-6 text-gray-500">Cargando...</p>
    if (error)   return <p className="p-6 text-red-500">{error}</p>

    return (

        <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Propietarios
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            {owners.length} registros
                        </span>
                    </h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        + Nuevo propietario
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-6 px-4 py-2 bg-gray-50 border-b border-gray-200 gap-3">
                        <span className="col-span-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Documento</span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Teléfono</span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Acciones</span>
                    </div>
                    {/* Filas */}
                    {owners.map((owner, index) => (
                        <div
                            key={owner.id}
                            className={`grid grid-cols-6 px-4 py-3 gap-3 items-center ${
                                index < owners.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                        >
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">{owner.full_name} {owner.last_name}</p>
                            </div>
                            <p className="text-sm text-gray-500">{owner.type_document} · {owner.number_document}</p>
                            <p className="text-sm text-gray-500 truncate">{owner.email}</p>
                            <p className="text-sm text-gray-500">{owner.phone}</p>
                            <div className="flex gap-2 justify-end">
                                <button className="text-xs border border-gray-200 text-gray-500 px-3 py-1 rounded-md hover:bg-gray-50">
                                    ✎ Editar
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(owner)}
                                    className="text-xs border border-red-200 text-red-500 px-3 py-1 rounded-md hover:bg-red-50">
                                    ✕ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">
                            Página {currentPage} de {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="text-sm border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 disabled:opacity-40"
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`text-sm border px-3 py-1 rounded-md ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="text-sm border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 disabled:opacity-40"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                )}
                <ConfirmDialog
                    isOpen={confirmOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancel}
                    message={`¿Eliminar a "${selectedOwner?.full_name}"?`}
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

export default OwnersPage