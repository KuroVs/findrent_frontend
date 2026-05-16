import { api } from './api'

export const propertiesService = {

    getAll: (page = 1, filters = {}) => {
        const params = new URLSearchParams({ page, ...filters })
        return api(`/properties?${params}`)
    },

    getById: (id) => {
        return api(`/properties/${id}`)
    },

    create: (data) => {
        return api('/properties', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    },

    update: (id, data) => {
        return api(`/properties/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    },

    remove: (id) => {
        return api(`/properties/${id}`, {
            method: 'DELETE'
        })
    },

    addAmenities: (id, amenity_ids) => {
        return api(`/properties/${id}/amenities`, {
            method: 'POST',
            body: JSON.stringify({ amenity_ids })
        })
    },

    removeAmenity: (id, amenityId) => {
        return api(`/properties/${id}/amenities/${amenityId}`, {
            method: 'DELETE'
        })
    }
}