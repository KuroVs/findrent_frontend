import { useEffect, useState } from 'react'

function AmenityModal({ isOpen, onClose, onSubmit, amenity }) {
    const [form, setForm] = useState({ name: '', description: '' })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (amenity) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({ name: amenity.name, description: amenity.description })
        } else {
            setForm({ name: '', description: '' })
        }
        setErrors({})
    }, [amenity, isOpen])

    if (!isOpen) return null

    const title = amenity ? 'Editar amenidad' : 'Nueva amenidad'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null })
        }
    }

    const handleSubmit = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre <span className="text-red-400">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none ${
                                errors.name
                                    ? 'border-red-400 focus:border-red-400'
                                    : 'border-gray-200 focus:border-blue-500'
                            }`}
                            placeholder="Ej: Piscina"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Piscina climatizada para residentes"
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
                        {amenity ? 'Guardar cambios' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AmenityModal