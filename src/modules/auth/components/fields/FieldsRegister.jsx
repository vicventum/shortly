import { useState } from 'react';
import { Icon } from '@iconify/react'
import { AInput } from '@/modules/core/components/atom/AInput'

export function FieldsRegister({ name, email, password, confirm }) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	return (
		<>
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
		</>
	);
}
