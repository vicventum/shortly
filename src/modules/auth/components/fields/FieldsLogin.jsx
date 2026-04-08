import { useState } from 'react';
import { Icon } from '@iconify/react'
import { AInput } from '@/modules/core/components/atom/AInput'

export function FieldsLogin({ getFieldProps }) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<>
			<AInput
				placeholder='Email Address'
				type='email'
				{...getFieldProps('email')}
			/>

			<AInput
				placeholder='Password'
				type={showPassword ? 'text' : 'password'}
				{...getFieldProps('password')}
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
		</>
	)
}
