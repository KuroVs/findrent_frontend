import { useEffect, useState } from 'react'
import { ownersService } from '../services/owners.service'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import OwnerModal from '../components/OwnerModal'

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
                setOwners(owners.filter(o => o.id !== selectedOwner.id))
                setConfirmOpen(false)
                showToast(`"${selectedOwner.full_name}" eliminado correctamente`)
            })
            .catch(() => {
                setConfirmOpen(false)
                showToast('No se pudo eliminar el propietario', 'error')
            })
    }

    const handleNewClick = () => {
        setModalOpen(true)
        setEditingOwner(null)
    }

    const handleEditClick = (owner) => {
        setModalOpen(true)
        setEditingOwner(owner)
    }

    const handleSubmit = (formData) => {
        if (editingOwner) {
            ownersService.update(editingOwner.id, formData)
                .then(() => {
                    setOwners(owners.map(o => o.id === editingOwner.id ? { ...o, ...formData } : o))
                    setModalOpen(false)
                    showToast(`"${editingOwner.full_name}" actualizado correctamente`)
                })
                .catch((err) => {
                    showToast(err.message || 'Error al actualizar el propietario', 'error')
                })
        } else {
            ownersService.create(formData)
                .then((newOwner) => {
                    setOwners([...owners, newOwner])
                    setModalOpen(false)
                    showToast(`"${formData.full_name}" creado correctamente`)
                })
                .catch((err) => {
                    showToast(err.message || 'Error al crear el propietario', 'error')
                })
        }
    }

    useEffect(() => {
        ownersService.getAll(currentPage)
            .then(response => {
                setOwners(response.data)
                setTotalPages(response.totalPages)
            })
            .catch(() => setError('No se pudieron cargar los propietarios'))
            .finally(() => setLoading(false))
    }, [currentPage])

    if (loading) return <p className="p-6 text-gray-500">Cargando...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Propietarios
                    <span className="ml-2 text-sm font-normal text-gray-500">
                        {owners.length} registros
                    </span>
                </h1>
                <button
                    onClick={handleNewClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                    + Nuevo propietario
                </button>
            </div>

            {/* Tabla — solo desktop */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-6 px-4 py-2 bg-gray-50 border-b border-gray-200 gap-3">
                    <span className="col-span-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Documento</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Teléfono</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Acciones</span>
                </div>
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
                            <button onClick={() => handleEditClick(owner)}
                                className="text-xs border border-gray-200 text-gray-500 px-3 py-1 rounded-md hover:bg-gray-50">
                                ✎ Editar
                            </button>
                            <button onClick={() => handleDeleteClick(owner)}
                                className="text-xs border border-red-200 text-red-500 px-3 py-1 rounded-md hover:bg-red-50">
                                ✕ Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cards — solo mobile */}
            <div className="lg:hidden flex flex-col gap-3">
                {owners.map(owner => (
                    <div key={owner.id} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-medium text-gray-900">{owner.full_name} {owner.last_name}</p>
                                <p className="text-xs text-gray-500 mt-1">{owner.type_document} · {owner.number_document}</p>
                            </div>
                            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Activo</span>
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <p className="text-xs text-gray-500">✉ {owner.email}</p>
                            <p className="text-xs text-gray-500">📞 {owner.phone}</p>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button onClick={() => handleEditClick(owner)}
                                className="flex-1 text-xs border border-gray-200 text-gray-500 py-2 rounded-lg hover:bg-gray-50">
                                ✎ Editar
                            </button>
                            <button onClick={() => handleDeleteClick(owner)}
                                className="flex-1 text-xs border border-red-200 text-red-500 py-2 rounded-lg hover:bg-red-50">
                                ✕ Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
            <OwnerModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                owner={editingOwner}
            />
        </div>
    )
}

export default OwnersPage