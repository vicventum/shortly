import { useMutation } from '@/modules/_core/api/hooks/use-mutation' // Ajusta el path
import { saveUrlShortenedList } from '@/modules/links/_shared/api/providers/provider-url-shortener-localstorage'
import { setUrlShortenedList } from '@/modules/links/_shared/api/services/service-url-shortener'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

function useSaveUrlList() {
  const provider = saveUrlShortenedList
  // const urlList = useUrlStore((state) => state.urlList)
  const addUrl = useUrlStore(state => state.addUrl)

  const { data, error, status, isPending, isError, mutateAsync } = useMutation({
    mutationFn: ({ variables, signal }) => {
      return setUrlShortenedList(provider, {
        signal,
        payload: { urlList: variables.urlList },
      })
    },
  })

  // useEffect(() => {
  // 	console.log({ urlList })
  // 	mutateAsync({ urlList })
  // }, [urlList])

  // Envolvemos la mutaciÃ³n para actualizar el contexto y guardar la data en un solo paso
  const saveUrlList = async newUrlData => {
    // 1. Actualizamos el store visualmente
    addUrl(newUrlData)
    // // 2. Calculamos la nueva lista para enviarla a la mutaciÃ³n (evitando cierres de estado obsoletos)
    // const newList = urlList ? [newUrlData, ...urlList] : [newUrlData]
    // 2. Obtenemos la lista ya actualizada directamente del store
    const updatedList = useUrlStore.getState().urlList

    // 3. Ejecutamos la mutaciÃ³n hacia el provider
    return mutateAsync({ urlList: updatedList })
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

