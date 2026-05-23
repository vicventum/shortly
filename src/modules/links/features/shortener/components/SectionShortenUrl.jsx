import { FormUrl } from '@/modules/links/features/shortener/components/FormUrl'
import { ListShortenedUrls } from '@/modules/links/features/shortener/components/ListShortenedUrls'
import { cn } from '@/modules/core/utils/cn'

import { useShortUrl } from '@/modules/links/features/shortener/api/use-short-url'
import { useGetUrlList } from '@/modules/links/features/shortener/api/use-get-url-list'
import { useSaveUrlList } from '@/modules/links/features/shortener/api/use-save-url-list'

export function SectionShortenUrl() {
	const { data: urlList, refetch } = useGetUrlList()
	const { sendNewUrl, isPending: isShortening } = useShortUrl()
	const { saveUrlList } = useSaveUrlList()

	async function handleSubmit({ value }) {
		try {
			const urlShortened = await sendNewUrl({ url: value })
			console.log({ urlShortened })
			if (!urlShortened) return null

			// ValidaciÃ³n para evitar guardar duplicados
			const isDuplicate = urlList?.some(
				(item) => item.urlShortened === urlShortened
			)

			if (isDuplicate) {
				console.log('Esta URL ya fue acortada y existe en la lista local.')
				// Opcional: podrÃ­as mostrar una notificaciÃ³n al usuario aquÃ­
				return null
			}

			const result = await saveUrlList({
				url: value,
				urlShortened,
			})
			console.log({ result })

			refetch()
		} catch (error) {
			// Los errores ya se manejan internamente en los hooks, pero aquÃ­ puedes poner lÃ³gica extra de UI si fuera necesario.
			console.error('Error en el flujo de acortado:', error)
		}
	}

	return (
		<div className="container space-y-5">
			<FormUrl
				isLoading={isShortening}
				onSubmitUrl={handleSubmit}
			/>

			<ListShortenedUrls
				className={cn({ hidden: !urlList?.length })}
				urlList={urlList}
			/>
		</div>
	)
}

