const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const clientFetch = async (url, options) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  const response = await fetch(fullUrl, { ...options })
  return response
}

export { clientFetch }
