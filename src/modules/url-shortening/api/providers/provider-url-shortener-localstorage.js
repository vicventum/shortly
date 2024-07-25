// import { clientFetch } from '@/modules/core/api/clients/client-fetch'

const fetchUrlShortenedList = async ({ signal } = {}) => {
  const data = await window.localStorage.getItem('shortly.urlShortenedList')

  if (data === null) return []
  return JSON.parse(data)
}

const saveUrlShortenedList = async ({ signal, payload } = {}) => {
  const { urlList } = payload

  const data = JSON.stringify(urlList)
  await window.localStorage.setItem('shortly.urlShortenedList', data)

  return data
}

export { fetchUrlShortenedList, saveUrlShortenedList }
