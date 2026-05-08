import { useEffect } from 'react'
import { AButton } from '@/modules/core/components/atom/AButton'
import { useForm } from '@/modules/core/hooks/use-form'
import { useSession } from '@/modules/auth/hooks/use-session'
import { useUpdateProfile } from '@/modules/settings/api/hooks/use-update-profile'
import { FieldsProfileSettings } from '@/modules/settings/components/fields/FieldsProfileSettings'

export function FormProfileSettings() {
	const { user } = useSession()
	const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()

	const initialValues = {
		avatarUrl: user?.avatarUrl || '',
		name: user?.name || '',
		email: user?.email || '',
		role: user?.role || 'user',
		phone: user?.phone || '',
		website: user?.website || '',
		biography: user?.biography || '',
	}

	const { submit, getFieldProps, getFieldError, formData, resetForm, isFormValid } = useForm({
		initialValues,
		validators: {
			name: (value) => {
				if (!value || value.trim() === '') return 'El nombre es obligatorio'
				return null
			},
		},
	})

	// Asegura de sincronizar los datos del formulario con los datos del usuario al obtenerlos de forma asíncrona
	useEffect(() => {
		if (user) {
			resetForm({
				avatarUrl: user.avatarUrl || '',
				name: user.name || '',
				email: user.email || '',
				role: user.role || 'user',
				phone: user.phone || '',
				website: user.website || '',
				biography: user.biography || '',
			})
		}
	}, [user?.id])

	const handleSubmit = async (data) => {
		try {
			// El backend exige name y role obligatorios (ver server.js app.patch/put /users/:id)
			// Aunque el input role este disable (si no es admin), useForm incluye su valor de initialValues/state
			await updateProfile(data)
		} catch (error) {
			console.error('Error updating profile:', error)
		}
	}

	const handleCancel = () => {
		resetForm(initialValues)
	}

	return (
		<form className="flex flex-col gap-8" onSubmit={submit(handleSubmit)}>
			<FieldsProfileSettings 
				getFieldProps={getFieldProps} 
				getFieldError={getFieldError}
				userRole={user?.role} 
				avatarUrl={formData.avatarUrl}
			/>

			<div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 border-t border-base-200">
				<AButton 
					type="button" 
					variant="ghost" 
					className="w-full md:w-auto"
					onClick={handleCancel}
					disabled={isUpdating}
				>
					Cancelar
				</AButton>
				<AButton 
					type="submit" 
					color="primary" 
					className="w-full md:w-auto"
					isLoading={isUpdating}
					disabled={!isFormValid || isUpdating}
				>
					Guardar cambios
				</AButton>
			</div>
		</form>
	)
}
