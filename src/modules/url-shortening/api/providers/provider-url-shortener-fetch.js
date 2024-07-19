import {
  BASE_SHORTENING_URL,
  API_KEY_SHORTENING_URL,
} from '@/modules/core/constants'
import { clientFetch } from '@/modules/core/api/clients/client-fetch'

const urlShortener = `${BASE_SHORTENING_URL}?key=${API_KEY_SHORTENING_URL}`
// const url = new URL('http://myapi.com/orders?key=123')
// url.searchParams.set('order_id', '1')

const getUrlShortened = async ({ signal, payload } = {}) => {
  // const bodyContent = JSON.stringify(payload)
  const { url } = payload 

  const resp = await clientFetch(`${urlShortener}&short=${url}`, {
    signal,
    method: 'GET',
    // body: bodyContent,
  })
  if (!resp.ok) throw new Error('Network response was not ok')
  const data = await resp.json()
  return data
}

export { getUrlShortened }
