const API_URL = 'http://localhost:3000'

export const api = async (endpoint, options = {}) => {

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
    }

    return response.json()
}