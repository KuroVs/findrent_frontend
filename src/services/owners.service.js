import { api } from './api'

export const ownersService = {

    getAll: (page = 1, limit = 10) => {
        return api(`/owners?page=${page}&limit=${limit}`)
    },

    getById: (id) => {
        return api(`/owners/${id}`)
    },

    create: (data) => {
        return api('/owners', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    },

    update: (id, data) => {
        return api(`/owners/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    },

    remove: (id) => {
        return api(`/owners/${id}`, {
            method: 'DELETE'
        })
    }

}