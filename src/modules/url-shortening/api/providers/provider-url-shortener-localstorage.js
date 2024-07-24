// import { BASE_SHORTENING_URL } from '@/modules/core/constants'
// import { clientFetch } from '@/modules/core/api/clients/client-fetch'

const fetchUrlShortenedList = async ({ signal } = {}) => {
  const data = await window.localStorage.getItem('shortly.urlShortenedList')
  // console.log('🚀 ~ Provider - fetchUrlShortenedList ~ data:', data)

  if (data === null) return []
  return JSON.parse(data)
}

const saveUrlShortenedList = async ({ signal, payload } = {}) => {
  const { urlList } = payload
  // console.log('🚀🚀 ~ saveUrlShortenedList ~ urlList:', urlList)

  const data = await window.localStorage.setItem(
    'shortly.urlShortenedList',
    JSON.stringify(urlList)
  )
  console.log('🚀🚀 ~ Provider - saveUrlShortenedList ~ data:', data)

  return data
}

export { fetchUrlShortenedList, saveUrlShortenedList }
