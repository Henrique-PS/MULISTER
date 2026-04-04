import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
