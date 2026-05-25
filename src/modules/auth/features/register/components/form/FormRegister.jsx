import { useState } from 'react'
import { NavLink } from 'react-router'

import { AButton } from '@/modules/_core/components/atom/AButton'
import { FieldsRegister } from '@/modules/auth/features/register/components/fields/FieldsRegister'
import { validateRegister } from '@/modules/auth/features/register/validators/register.validator'
import { useForm } from '@/modules/_core/hooks/use-form'
import { useRegister } from '@/modules/auth/features/register/api/use-register'

export function FormRegister() {
	const { mutateAsync: registerUser, isPending: isLoading } = useRegister()
	const [errorMsg, setErrorMsg] = useState('')

	// 2. Usamos useForm para manejar un solo objeto
	const { submit, getFieldProps, getFieldError } = useForm({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirm: '',
			role: 'user',
		},
		validators: {
			name: validateRegister.name,
			email: validateRegister.email,
			password: validateRegister.password,
			role: validateRegister.role,
			// Gracias al segundo parÃ¡metro de validaciÃ³n en useForm, accedemos a "allValues"
			confirm: (val, allValues) => validateRegister.confirmPassword(val, allValues.password),
		},
	})

	// La lÃ³gica real de submit recibe el formData ya estructurado y validado
	const handleSubmit = async (formData) => {
		console.log('Datos listos para enviar:', formData)
		setErrorMsg('')

		try {
			await registerUser(formData)
			// RedirecciÃ³n se maneja por auth-guard de react-router si estamos en una ruta de guest
			// Al estar autenticados, `<ProtectedRoute requireGuest>` o similar o el Layout 
			// podrÃ­a redirigir a `/dashboard` si se quiere, o lo hacemos programÃ¡ticamente:
			// navigate('/dashboard')
		} catch (error) {
			console.error('Registration failed:', error)
			setErrorMsg(error.message || 'Error occurred during registration.')
		}
	}
	return (
		<form className='mt-8 flex w-full flex-col gap-6' onSubmit={submit(handleSubmit)}>
			{errorMsg && (
				<div className="alert alert-error text-sm py-2 px-4 text-white">
					{errorMsg}
				</div>
			)}
			<FieldsRegister getFieldProps={getFieldProps} getFieldError={getFieldError} />

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
				Sign Up
			</AButton>

			<div className='mt-2 text-center text-sm font-medium text-base-300'>
				Already have an account?{' '}
				<NavLink to='/login' className='font-bold text-primary hover:underline'>
					Login
				</NavLink>
			</div>
		</form>
	)
}

