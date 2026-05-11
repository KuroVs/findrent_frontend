import { useEffect, useState } from 'react'

function OwnerModal({ isOpen, onClose, onSubmit, owner }) {

    const [form, setForm] = useState({ full_name: '', last_name: '', type_document: '', number_document: '', email: '', phone: '' })

    useEffect(() => {
        if (owner) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({ full_name: owner.full_name, last_name: owner.last_name, type_document: owner.type_document, number_document: owner.number_document,
                email: owner.email, phone: owner.phone})
        } else {
            setForm({ full_name: '', last_name: '', type_document: '', number_document: '',
                email: '', phone: '' })
        }
    }, [owner, isOpen])

    if (!isOpen) return null

    const title = owner ? 'Editar Propietario' : 'Nuevo Propietario'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (!form.full_name.trim()) return
        if (!form.type_document) return
        if (!form.number_document.trim()) return
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-xl">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</label>
                        <input
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Carlos"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</label>
                        <input
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Ramírez"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Documento</label>
                        <select
                            name="type_document"
                            value={form.type_document}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="CC">CC - Cédula de Ciudadanía</option>
                            <option value="CE">CE - Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="PP">PP - Pasaporte</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Documento</label>
                        <input
                            name="number_document"
                            value={form.number_document}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 100000000"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: carlos@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 3001234567"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        {owner ? 'Guardar cambios' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OwnerModal