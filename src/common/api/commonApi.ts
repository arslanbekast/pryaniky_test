import axios from 'axios'

export const pryanikyApi = axios.create({
  baseURL: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs',
})

pryanikyApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['x-auth'] = token
  }
  return config
})
