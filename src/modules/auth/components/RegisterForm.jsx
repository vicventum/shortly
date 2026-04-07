import { useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Icon } from '@iconify/react'

import { AInput } from '@/modules/core/components/atom/AInput'
import { AButton } from '@/modules/core/components/atom/AButton'
import { useInput } from '@/modules/core/hooks/use-input'
import { validateRegister } from '@/modules/auth/validators/FormRegister.validator'


export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// 2. Instanciamos los hooks pasando la regla correspondiente
	const name = useInput({ validator: validateRegister.name })
	const email = useInput({ validator: validateRegister.email })
	const password = useInput({ validator: validateRegister.password })

	// Para la confirmación, evaluamos dinámicamente contra el valor actual del password
	const confirm = useInput({ validator: (val) => validateRegister.confirmPassword(val, password.value) })

	const isFormValid = name.isValid && email.isValid && password.isValid && confirm.isValid

	function handleSubmit(e) {
		e.preventDefault()

		// Si el formulario es inválido, forzamos el "touch" en todos los campos
		// para que la UI de los componentes atómicos reaccione y muestre los errores.
		if (!isFormValid) {
			name.touch()
			email.touch()
			password.touch()
			confirm.touch()
			return
		}

		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			// TODO: implement actual signup
		}, 1000)
	}

	return (
		<form className='mt-8 flex w-full flex-col gap-6' onSubmit={handleSubmit}>
			<AInput
				placeholder='Full Name'
				value={name.value}
				onChange={name.onChange}
				onBlur={name.onBlur}
				color={name.showError ? 'error' : 'default'}
				invalidMessage={name.errorMessage}
			/>

			<AInput
				placeholder='Email Address'
				type='email'
				value={email.value}
				onChange={email.onChange}
				onBlur={email.onBlur}
				color={email.showError ? 'error' : 'default'}
				invalidMessage={email.errorMessage}
			/>

			<AInput
				placeholder='Password'
				type={showPassword ? 'text' : 'password'}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				color={password.showError ? 'error' : 'default'}
				invalidMessage={password.errorMessage}
				rightSlot={
					<button
						type='button'
						tabIndex={-1}
						className='z-10 flex cursor-pointer items-center justify-center p-1 text-base-300 hover:text-base-400 focus:outline-none'
						onClick={() => setShowPassword(!showPassword)}
					>
						<Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className='size-5' />
					</button>
				}
			/>

			<AInput
				placeholder='Confirm Password'
				type={showConfirmPassword ? 'text' : 'password'}
				value={confirm.value}
				onChange={confirm.onChange}
				onBlur={confirm.onBlur}
				color={confirm.showError ? 'error' : 'default'}
				invalidMessage={confirm.errorMessage}
				rightSlot={
					<button
						type='button'
						tabIndex={-1}
						className='z-10 flex cursor-pointer items-center justify-center p-1 text-base-300 hover:text-base-400 focus:outline-none'
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					>
						<Icon icon={showConfirmPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className='size-5' />
					</button>
				}
			/>

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
