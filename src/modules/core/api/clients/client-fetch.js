import { FetchError } from '@/modules/core/api/errors/fetch-error'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const clientFetch = async (url, options = {}) => {
  const { raw = false, ...fetchOptions } = options
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  const response = await fetch(fullUrl, { ...fetchOptions })

  if (raw) {
    if (!response.ok) {
      throw new FetchError(response.status, response.statusText, await response.text())
    }
    return response
  }

  // Parseo automático
  const contentType = response.headers.get('content-type')
  let data
  if (contentType?.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, data)
  }

  return data
}

export { clientFetch }
