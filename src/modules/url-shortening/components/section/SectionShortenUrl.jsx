import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedUrls } from '@/modules/url-shortening/components/list/ListShortenedUrls'
import { cn } from '@/modules/core/utils/cn'

import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { useGetUrlList } from '@/modules/url-shortening/api/hooks/use-get-url-list'
import { useSaveUrlList } from '@/modules/url-shortening/api/hooks/use-save-url-list'

export function SectionShortenUrl() {
	const { data: urlList, refetch } = useGetUrlList()
	const { sendNewUrl, isPending: isShortening } = useShortUrl()
	const { saveUrlList } = useSaveUrlList()

	async function handleSubmit({ value }) {
		try {
			const urlShortened = await sendNewUrl({ url: value })
			console.log({ urlShortened })
			if (!urlShortened) return null

			// Validación para evitar guardar duplicados
			const isDuplicate = urlList?.some(
				(item) => item.urlShortened === urlShortened
			)

			if (isDuplicate) {
				console.log('Esta URL ya fue acortada y existe en la lista local.')
				// Opcional: podrías mostrar una notificación al usuario aquí
				return null
			}

			const result = await saveUrlList({
				url: value,
				urlShortened,
			})
			console.log({ result })

			refetch()
		} catch (error) {
			// Los errores ya se manejan internamente en los hooks, pero aquí puedes poner lógica extra de UI si fuera necesario.
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
