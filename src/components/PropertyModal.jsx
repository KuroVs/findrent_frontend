import { useEffect, useState } from 'react'
import { ownersService } from '../services/owners.service'
import { amenitiesService } from '../services/amenities.service'


function PropertyModal({ isOpen, onClose, onSubmit, property }) {

    const [form, setForm] = useState({ owner_id: ' ', title: '', description: '', price: 0, city: '', address: '',area_m2: 0.0, bedrooms: 0, bathrooms: 0, is_active: true, amenities: []})

        // Estados para las listas
    const [owners, setOwners] = useState([])
    const [amenitiesList, setAmenitiesList] = useState([])


        // Carga owners y amenidades al montar
    useEffect(() => {
        ownersService.getAll()
            .then(res => setOwners(res.data))
        amenitiesService.getAll()
            .then(data => setAmenitiesList(data))
    }, [])

    useEffect(() => {
        console.log('property recibida:', property)
        if (property) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({ owner_id: property.owner?.id, title: property.title, description: property.description, price: property.price, city: property.city,
                address: property.address, bedrooms: property.bedrooms, bathrooms: property.bathrooms, is_active: property.is_active, amenities: property.amenities, area_m2: property.area_m2 })
        } else {
            setForm({ owner_id: '', title: '', description: '', price: 0, city: '',
                address: '', bedrooms: 0, bathrooms: 0,area_m2: 0.0, is_active: true, amenities: []})
        }
    }, [property, isOpen])

    if (!isOpen) return null

    const title = property ? 'Editar Propiedad' : 'Nuevo Propiedad'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (!form.title.trim()) return
        if (!form.owner_id) return
        if (!form.price) return
        if (!form.city.trim()) return
        if (!form.bedrooms) return
        if (!form.bathrooms) return
        onSubmit(form)
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <div className="grid grid-cols-2 gap-4">
                    {/* Título */}
                    <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Título</label>
                        <input name="title" value={form.title} onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Apartamento en El Poblado" />
                    </div>

                    {/* Propietario */}
                    <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</label>
                        <select name="owner_id" value={form.owner_id} onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                            <option value="">Seleccionar propietario...</option>
                            {owners.map(owner => (
                                <option key={owner.id} value={owner.id}>
                                    {owner.full_name} {owner.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</label>
                        <input name="price" value={form.price} onChange={handleChange} type="number"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 2500000" />
                    </div>

                    {/* Ciudad */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</label>
                        <input name="city" value={form.city} onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Medellín" />
                    </div>

                    {/* Dirección */}
                    <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</label>
                        <input name="address" value={form.address} onChange={handleChange}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: Calle 10 # 43-12" />
                    </div>

                    {/* Habitaciones */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Habitaciones</label>
                        <input name="bedrooms" value={form.bedrooms} onChange={handleChange} type="number"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 3" />
                    </div>

                    {/* Baños */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Baños</label>
                        <input name="bathrooms" value={form.bathrooms} onChange={handleChange} type="number"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 2" />
                    </div>

                    {/* Área */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Área m²</label>
                        <input name="area_m2" value={form.area_m2} onChange={handleChange} type="number"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Ej: 95" />
                    </div>

                    {/* Estado */}
                    <div className="flex items-center gap-3 mt-4">
                        <input type="checkbox" id="is_active" checked={form.is_active}
                            onChange={e => setForm({ ...form, is_active: e.target.checked })}
                            className="w-4 h-4 accent-blue-600" />
                        <label htmlFor="is_active" className="text-sm text-gray-600">Propiedad activa</label>
                    </div>

                    {/* Descripción */}
                    <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                            placeholder="Describe la propiedad..." />
                    </div>

                    {/* Amenidades */}
                    <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Amenidades</label>
                        <div className="flex flex-wrap gap-2">
                            {amenitiesList.map(amenity => {
                                const isSelected = form.amenities.some(a => a.id === amenity.id)
                                return (
                                    <button
                                        key={amenity.id}
                                        type="button"
                                        onClick={() => {
                                            if (isSelected) {
                                                setForm({ ...form, amenities: form.amenities.filter(a => a.id !== amenity.id) })
                                            } else {
                                                setForm({ ...form, amenities: [...form.amenities, amenity] })
                                            }
                                        }}
                                        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                                            isSelected
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {amenity.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose}
                        className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        {property ? 'Guardar cambios' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
)
}
export default PropertyModal