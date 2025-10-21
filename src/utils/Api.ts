import axios from 'axios'


export const Api = axios.create({
  baseURL: 'https://api-reservas-2jc7.onrender.com',
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
