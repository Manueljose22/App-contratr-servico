import axios from 'axios'

const API_URL = (import.meta as any).env?.VITE_API_URL;

export const Api = axios.create({
  baseURL: API_URL,
  timeout: 5000
})


Api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const auth = sessionStorage.getItem('auth')
    if (auth) {
      try {
        const token = JSON.parse(auth)?.state?.user?.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (e) {
        console.error('Erro ao parsear auth:', e)
      }
    }
  }
  return config
})
