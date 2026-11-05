import axios from 'axios';
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`

    }
    return config

})
client.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const token = localStorage.getItem("token")
        if (error.response?.status === 401 && token !== null) {
            localStorage.removeItem("token")
            window.location.href = "/login?expired=1"

        }
        return Promise.reject(error)
    }

)
export default client
