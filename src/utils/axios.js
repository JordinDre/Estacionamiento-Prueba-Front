import axios from "axios";

const token = localStorage.getItem('AUTH_TOKEN')

const axioss = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true
})

export default axioss