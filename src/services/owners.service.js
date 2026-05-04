import { api } from './api'

export const ownersService = {

    getAll: () => {

        return api('/owners')
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