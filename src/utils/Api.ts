import axios from 'axios'


export const Api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000
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
