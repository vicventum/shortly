import { useMutation } from '@/modules/core/api/hooks/use-mutation' // Ajusta el path
import { saveUrlShortenedList } from '@/modules/url-shortening/api/providers/provider-url-shortener-localstorage'
import { setUrlShortenedList } from '@/modules/url-shortening/api/services/service-url-shortener'
import { UrlContext } from '@/modules/url-shortening/contexts/context-url'
import { useContextCheck } from '@/modules/core/hooks/use-context-check'

function useSaveUrlList() {
	const provider = saveUrlShortenedList
	const { urlList, addUrlList } = useContextCheck(UrlContext, 'useSaveUrlList')

	const {
		data,
		error,
		status,
		isPending,
		isError,
		mutateAsync,
	} = useMutation({
		mutationFn: ({ variables, signal }) => {
			return setUrlShortenedList(provider, { signal, payload: { urlList: variables.urlList } })
		},
	})

	// useEffect(() => {
	// 	console.log({ urlList })
	// 	mutateAsync({ urlList })
	// }, [urlList])

	// Envolvemos la mutación para actualizar el contexto y guardar la data en un solo paso
	const saveUrlList = async (newUrlData) => {
		// 1. Actualizamos el contexto visual
		addUrlList(newUrlData)

		// 2. Calculamos la nueva lista para enviarla a la mutación (evitando cierres de estado obsoletos)
		const newList = urlList ? [newUrlData, ...urlList] : [newUrlData]
		// 3. Ejecutamos la mutación hacia tu provider
		return mutateAsync({ urlList: newList })
	}

	return {
		data,
		error,
		status,
		isPending,
		isError,
		saveUrlList,
	}
}

export { useSaveUrlList }
