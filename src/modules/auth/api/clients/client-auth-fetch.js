import { clientFetch } from '@/modules/core/api/clients/client-fetch'

// const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL

const clientAuthFetch = async (url, options = {}) => {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    ...options.headers,
  }

  const response = await clientFetch(url, { ...options, headers })
  return response
}

export { clientAuthFetch }
