import { useState } from 'react'
import { NavLink } from 'react-router'

import { AButton } from '@/modules/core/components/atom/AButton'
import { FieldsRegister } from '@/modules/auth/components/fields/FieldsRegister'
import { validateRegister } from '@/modules/auth/validators/FormRegister.validator'
import { useForm } from '@/modules/core/hooks/use-form'

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)

	// 2. Usamos useForm para manejar un solo objeto
	const { submit, getFieldProps } = useForm({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirm: '',
		},
		validators: {
			name: validateRegister.name,
			email: validateRegister.email,
			password: validateRegister.password,
			// Gracias al segundo parámetro de validación en useForm, accedemos a "allValues"
			confirm: (val, allValues) => validateRegister.confirmPassword(val, allValues.password),
		},
	})

	// La lógica real de submit recibe el formData ya estructurado y validado
	const handleSubmit = (formData) => {
		console.log('Datos listos para enviar:', formData) // { name: '...', email: '...', password: '...' }

		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			// TODO: implement actual signup
		}, 1000)
	}
	return (
		<form className='mt-8 flex w-full flex-col gap-6' onSubmit={submit(handleSubmit)}>
			<FieldsRegister getFieldProps={getFieldProps} />

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
