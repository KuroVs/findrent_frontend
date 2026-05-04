import { api } from './api'

export const amenitiesService = {

    getAll: () => {

        return api('/amenities')
    },

    getById: (id) => {
        return api(`/amenities/${id}`)
    },

    create: (data) => {
        return api('/amenities', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    },

    update: (id, data) => {
        return api(`/amenities/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    },

    remove: (id) => {
        return api(`/amenities/${id}`, {
            method: 'DELETE'
        })
    }

}