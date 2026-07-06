import { useEffect, useState } from 'react'

function OwnerModal({ isOpen, onClose, onSubmit, owner }) {

    const [form, setForm] = useState({ full_name: '', last_name: '', type_document: '', number_document: '', email: '', phone: '' })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (owner) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({ full_name: owner.full_name, last_name: owner.last_name, type_document: owner.type_document, number_document: owner.number_document, email: owner.email, phone: owner.phone })
        } else {
            setForm({ full_name: '', last_name: '', type_document: '', number_document: '', email: '', phone: '' })
        }
        setErrors({})
    }, [owner, isOpen])

    if (!isOpen) return null

    const title = owner ? 'Editar Propietario' : 'Nuevo Propietario'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null })
        }
    }

    const handleSubmit = () => {
        const newErrors = {}
        if (!form.full_name.trim()) newErrors.full_name = 'El nombre es obligatorio'
        if (!form.type_document) newErrors.type_document = 'Selecciona un tipo de documento'
        if (!form.number_document.trim()) newErrors.number_document = 'El número de documento es obligatorio'
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        onSubmit(form)
    }

    const inputClass = (field) =>
        `mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none ${
            errors[field]
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-200 focus:border-blue-500'
        }`

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-xl">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombres <span className="text-red-400">*</span>
                        </label>
                        <input name="full_name" value={form.full_name} onChange={handleChange}
                            className={inputClass('full_name')} placeholder="Ej: Carlos" />
                        {errors.full_name && <p className="text-xs text-red-400 mt-1">{errors.full_name}</p>}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</label>
                        <input name="last_name" value={form.last_name} onChange={handleChange}
                            className={inputClass('last_name')} placeholder="Ej: Ramírez" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo de Documento <span className="text-red-400">*</span>
                        </label>
                        <select name="type_document" value={form.type_document} onChange={handleChange}
                            className={inputClass('type_document')}>
                            <option value="">Seleccionar...</option>
                            <option value="CC">CC - Cédula de Ciudadanía</option>
                            <option value="CE">CE - Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="PP">PP - Pasaporte</option>
                        </select>
                        {errors.type_document && <p className="text-xs text-red-400 mt-1">{errors.type_document}</p>}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de Documento <span className="text-red-400">*</span>
                        </label>
                        <input name="number_document" value={form.number_document} onChange={handleChange}
                            className={inputClass('number_document')} placeholder="Ej: 100000000" />
                        {errors.number_document && <p className="text-xs text-red-400 mt-1">{errors.number_document}</p>}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                        <input name="email" value={form.email} onChange={handleChange}
                            className={inputClass('email')} placeholder="Ej: carlos@gmail.com" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                            className={inputClass('phone')} placeholder="Ej: 3001234567" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        {owner ? 'Guardar cambios' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OwnerModal