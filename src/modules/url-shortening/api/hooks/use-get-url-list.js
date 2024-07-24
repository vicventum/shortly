// import { useState, useEffect } from 'react'
import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { fetchUrlShortenedList } from '@/modules/url-shortening/api/providers/provider-url-shortener-localstorage'
import { getUrlShortenedList } from '@/modules/url-shortening/api/services/service-url-shortener'

function useGetUrlList() {
  const provider = fetchUrlShortenedList

  const { data, isLoading, error, refresh } = useFetch(({ signal }) => {
    return getUrlShortenedList(provider, { signal })
  })
  // console.log('🚀 ~ Hook useFetch ~ data:', data)

  return {
    data: data ?? [],
    isLoading,
    isError: !!error,
    error,
    refresh,
  }
}

export { useGetUrlList }
