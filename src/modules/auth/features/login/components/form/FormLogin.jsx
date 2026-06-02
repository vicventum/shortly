import { useState } from 'react'
import { NavLink } from 'react-router'

import { AButton } from '@/modules/_core/components/atom/AButton'
import { FieldsLogin } from '@/modules/auth/features/login/components/fields/FieldsLogin'
import { validateRegister } from '@/modules/auth/features/register/validators/register.validator'
import { useForm } from '@/modules/_core/hooks/use-form'
import { useLogin } from '@/modules/auth/features/login/api/use-login'

export function FormLogin() {
	const { mutateAsync: loginUser, isPending: isLoading } = useLogin()
	const [errorMsg, setErrorMsg] = useState('')

	// 2. Usamos useForm para manejar un solo objeto
	const { submit, getFieldProps, getFieldError } = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validators: {
			email: validateRegister.email,
			password: validateRegister.password,
		},
	})

	// La lÃ³gica real de submit recibe el formData ya estructurado y validado
	const handleSubmit = async (formData) => {
		console.log('Datos listos para enviar:', formData)
		setErrorMsg('')

		try {
			await loginUser(formData)
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
			<FieldsLogin getFieldProps={getFieldProps} getFieldError={getFieldError} />

			<AButton
				type='submit'
				color='primary'
				variant='rounded'
				className='mt-2 w-full text-base-100!'
				isLoading={isLoading}
				// RecomendaciÃ³n: Evita deshabilitar el botÃ³n de submit si el form es invÃ¡lido.
				// Es mejor permitir el click y que el usuario vea exactamente quÃ© campos faltan
				// por medio de los tooltips/colores disparados por el mÃ©todo touch() en el handleSubmit.
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

