import { useState, useEffect } from 'react'
import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { getUrlShortened } from '@/modules/url-shortening/api/providers/provider-url-shortener-fetch'
import { shortUrl } from '@/modules/url-shortening/api/services/service-url-shortener'

function useShortUrl() {
	const provider = getUrlShortened

	const [newUrl, setNewUrl] = useState('')

	const { data, isLoading, error, refetch } = useFetch({
		queryFn: ({ signal }) => {
			if (!newUrl) return null
			const payload = {
				url: newUrl,
			}
			return shortUrl(provider, { signal, payload })
		},
	})

	useEffect(() => {
		refetch()
	}, [newUrl])

	return {
		data,
		isLoading,
		isError: !!error,
		error,
		refetch,
		sendNewUrl: setNewUrl,
	}
}

export { useShortUrl }
