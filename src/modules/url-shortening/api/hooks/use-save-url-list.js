import { useState, useEffect } from 'react'
import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { saveUrlShortenedList } from '@/modules/url-shortening/api/providers/provider-url-shortener-localstorage'
import { setUrlShortenedList } from '@/modules/url-shortening/api/services/service-url-shortener'

function useSaveUrlList() {
  const provider = saveUrlShortenedList

  const [urlList, setUrlList] = useState([])

  const { isLoading, error, refresh } = useFetch(({ signal }) => {
    if (!urlList || !urlList.length) return null
    return setUrlShortenedList(provider, { signal, payload: { urlList } })
  })

  useEffect(() => {
    console.log('🚀🚀 ~ useSaveUrlList ~ urlList:', urlList)
    if (!urlList || !urlList.length) return undefined
    refresh()
  }, [urlList])

  return {
    isLoading,
    isError: !!error,
    error,
    setUrlList,
  }
}

export { useSaveUrlList }
