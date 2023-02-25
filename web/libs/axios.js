import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default $axios

