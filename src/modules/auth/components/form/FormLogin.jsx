import { useState } from 'react'
import { NavLink } from 'react-router'

import { AButton } from '@/modules/core/components/atom/AButton'
import { FieldsLogin } from '@/modules/auth/components/fields/FieldsLogin'
import { validateRegister } from '@/modules/auth/validators/register.validator'
import { useForm } from '@/modules/core/hooks/use-form'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { useLogin } from '@/modules/auth/api/hooks/use-login'

export function FormLogin() {
	const { loginContext } = useAuth()
	const { mutateAsync: loginUser, isPending: isLoading } = useLogin()
	const [errorMsg, setErrorMsg] = useState('')

	// 2. Usamos useForm para manejar un solo objeto
	const { submit, getFieldProps } = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validators: {
			email: validateRegister.email,
			password: validateRegister.password,
		},
	})

	// La lógica real de submit recibe el formData ya estructurado y validado
	const handleSubmit = async (formData) => {
		console.log('Datos listos para enviar:', formData)
		setErrorMsg('')

		try {
			const data = await loginUser(formData)
			loginContext(data.user, data.accessToken, data.refreshToken)
		} catch (error) {
			console.error('Login failed:', error)
			setErrorMsg(error.message || 'Invalid credentials.')
		}
	}
	return (
		<form className='mt-8 flex w-full flex-col gap-6' onSubmit={submit(handleSubmit)}>
			{errorMsg && (
				<div className="alert alert-error text-sm py-2 px-4 text-white">
					{errorMsg}
				</div>
			)}
			<FieldsLogin getFieldProps={getFieldProps} />

			<AButton
				type='submit'
				color='primary'
				variant='rounded'
				className='mt-2 w-full text-base-100!'
				isLoading={isLoading}
				// Recomendación: Evita deshabilitar el botón de submit si el form es inválido.
				// Es mejor permitir el click y que el usuario vea exactamente qué campos faltan
				// por medio de los tooltips/colores disparados por el método touch() en el handleSubmit.
				disabled={isLoading}
			>
				Login
			</AButton>

			<div className='mt-2 text-center text-sm font-medium text-base-300'>
				Are you new here?{' '}
				<NavLink to='/register' className='font-bold text-primary hover:underline'>
					Sign Up
				</NavLink>
			</div>
		</form>
	)
}
