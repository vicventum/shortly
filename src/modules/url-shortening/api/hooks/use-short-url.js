import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { getUrlShortened } from '@/modules/url-shortening/api/providers/provider-url-shortener-fetch'
import { shortUrl } from '@/modules/url-shortening/api/services/service-url-shortener'

function useShortUrl({ url }) {
  const provider = getUrlShortened

  const { data, isLoading, error, refresh } = useFetch(({ signal }) => {
    const payload = {
      url,
    }
    return shortUrl(provider, { signal, payload })
  })

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    refresh,
  }
}

export { useShortUrl }
