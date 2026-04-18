import { Icon } from '@iconify/react'
import { AButton } from '@/modules/core/components/atom/AButton'
import { URL_REGEX } from '@/modules/core/constants'
import { useForm } from '@/modules/core/hooks/use-form'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { useCreateLink } from '@/modules/dashboard/api/hooks/use-create-link'
import { AInput } from '@/modules/core/components/atom/AInput'

export function FormDashboardUrl({ onRefresh }) {
	const { sendNewUrl, isPending: isShortening } = useShortUrl()

	const { mutateAsync: createLink, isPending: isCreating } = useCreateLink({
		onSuccess: () => {
			// Disparamos callback en lugar del evento general
			if (onRefresh) onRefresh()
		},
		meta: {
			errorMessage: 'Error saving the link'
		}
	})

	const { submit, getFieldProps, formData, isFormValid } = useForm({
		initialValues: {
			originalUrl: '',
		},
		validators: {
			originalUrl: (value) => {
				if (!value || value.trim() === '') return 'Paste a link to shorten'
				if (!URL_REGEX.test(value.trim())) return 'Enter a valid URL'
				return null
			},
		},
	})

	const isLoading = isShortening || isCreating

	async function handleSubmit(data) {
		try {
			const originalUrl = data.originalUrl.trim()
			// 1. Obtener enlace acortado
			const shortResponse = await sendNewUrl({ url: originalUrl })

			// La API externa rel.ink o similar devuelve la "hash" o short_link
			// const shortUrl = shortResponse?.result_url || `https://rel.ink/${shortResponse?.hashid || 'short'}`

			// 2. Guardar en backend propio
			await createLink({
				originalUrl,
				shortUrl: shortResponse,
			})

			// Limpiar input llamando evento simulado (u obteniendo ref a form)
			// Como react use-form no provee setFormData nativamente exportado fácil, no tocamos nada por simplicidad,
			// Aunque lo ideal es reiniciar el formData.
		} catch (error) {
			console.error('Error shortening link:', error)
		}
	}

	const { color, invalidMessage, ...inputProps } = getFieldProps('originalUrl')

	return (
		<form className='flex flex-col gap-4 bg-base-100 md:flex-row' onSubmit={submit(handleSubmit)}>
			<div className="flex-1 w-full flex flex-col relative">
				<AInput
					{...inputProps}
					color={color}
					invalidMessage={invalidMessage}
					placeholder='Paste a link to shorten...'
					className='input-bordered'
					leftSlot={
						<Icon icon='ph:plus-bold' className='size-5 text-base-300' />
					}
				/>
			</div>

			<AButton
				isLoading={isLoading}
				disabled={isLoading}
				type="submit"
				size='md'
				className='w-full shrink-0 px-8 md:w-auto'
			>
				Shorten link
			</AButton>
		</form>
	)
}
