import { useEffect } from 'react'
import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { saveUrlShortenedList } from '@/modules/url-shortening/api/providers/provider-url-shortener-localstorage'
import { setUrlShortenedList } from '@/modules/url-shortening/api/services/service-url-shortener'
import { UrlContext } from '@/modules/url-shortening/contexts/context-url'
import { useContextCheck } from '@/modules/core/hooks/use-context-check'

function useSaveUrlList() {
	const provider = saveUrlShortenedList

	const { urlList, addUrlList } = useContextCheck(UrlContext, 'useSaveUrlList')

	const { data, isLoading, error, refetch } = useFetch({
		queryFn: ({ signal }) => {
			if (!urlList || !urlList.length) return null
			return setUrlShortenedList(provider, { signal, payload: { urlList } })
		},
	})

	useEffect(() => {
		refetch()
	}, [urlList])

	return {
		data,
		isLoading,
		isError: !!error,
		error,
		saveUrlList: addUrlList,
	}
}

export { useSaveUrlList }
