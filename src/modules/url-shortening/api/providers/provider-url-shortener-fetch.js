import { BASE_SHORTENING_URL } from '@/modules/core/constants'
import { clientFetch } from '@/modules/core/api/clients/client-fetch'

// const urlShortener = `${BASE_SHORTENING_URL}?key=${API_KEY_SHORTENING_URL}`
// const url = new URL('http://myapi.com/orders?key=123')
// url.searchParams.set('order_id', '1')

const getUrlShortened = async ({ signal, payload } = {}) => {
  const { url } = payload

  return await clientFetch(`${BASE_SHORTENING_URL}?url=${url}`, {
    signal,
    method: 'GET',
  })
}

export { getUrlShortened }
