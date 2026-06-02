import { useFetch } from '@/modules/_core/api/hooks/use-fetch'
import { fetchUrlShortenedList } from '@/modules/links/_shared/api/providers/provider-url-shortener-localstorage'
import { getUrlShortenedList } from '@/modules/links/_shared/api/services/service-url-shortener'

function useGetUrlList() {
	const provider = fetchUrlShortenedList

	const { data, isLoading, error, refetch } = useFetch({
		queryKey: ['url-shortened-list'],
		queryFn: ({ signal }) => getUrlShortenedList(provider, { signal }),
	})

	return {
		data: data ?? [],
		isLoading,
		isError: !!error,
		error,
		refetch,
	}
}

export { useGetUrlList }

