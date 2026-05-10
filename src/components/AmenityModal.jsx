import { useEffect, useState } from 'react'

function AmenityModal({ isOpen, onClose, onSubmit, amenity }) {
    const [form, setForm] = useState({ name: '', description: '' })

    useEffect(() => {
        if (amenity) {
            setForm({ name: amenity.name, description: amenity.description })
        } else {
            setForm({ name: '', description: '' })
        }
    }, [amenity, isOpen])

    if (!isOpen) return null

    const title = amenity ? 'Editar amenidad' : 'Nueva amenidad'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (!form.name.trim()) return
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Piscina"
                        />
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