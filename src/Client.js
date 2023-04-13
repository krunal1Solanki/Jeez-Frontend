import axios from 'axios'

export const client = axios.create({
  baseURL:'https://jeez-production.up.railway.app/',
     withCredentials: true,
})

