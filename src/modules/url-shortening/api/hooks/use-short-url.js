import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { getUrlShortened } from '@/modules/url-shortening/api/providers/provider-url-shortener-fetch'
import { shortUrl } from '@/modules/url-shortening/api/services/service-url-shortener'

function useShortUrl() {
	const provider = getUrlShortened

	const {
		data,
		error,
		status,
		isPending,
		isError,
		mutateAsync,
	} = useMutation({
		mutationFn: ({ signal, payload }) =>
			shortUrl(provider, { signal, payload }),
	})

	async function sendNewUrl({ url }) {
		return mutateAsync({ url })
	}

	return {
		data,
		isPending,
		isError,
		error,
		status,
		sendNewUrl,
	}
}

export { useShortUrl }
