import { useState } from 'react';
import { Icon } from '@iconify/react'
import { AFormField } from '@/modules/core/components/atom/AFormField'
import { AInput } from '@/modules/core/components/atom/AInput'
import { ASelect } from '@/modules/core/components/atom/ASelect'

export function FieldsRegister({ getFieldProps, getFieldError }) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const { color, ...roleProps } = getFieldProps('role')

	return (
		<>
			<AFormField invalidMessage={getFieldError('name')}>
				<AInput
					placeholder='Full Name'
					{...getFieldProps('name')}
				/>
			</AFormField>

			<AFormField invalidMessage={getFieldError('email')}>
				<AInput
					placeholder='Email Address'
					type='email'
					{...getFieldProps('email')}
				/>
			</AFormField>

			<AFormField invalidMessage={getFieldError('password')}>
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
			</AFormField>

			<AFormField invalidMessage={getFieldError('confirm')}>
				<AInput
					placeholder='Confirm Password'
					type={showConfirmPassword ? 'text' : 'password'}
					{...getFieldProps('confirm')}
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
			</AFormField>

			{/* Role Selector */}
			<AFormField invalidMessage={getFieldError('role')}>
				<ASelect 
					className="select-bordered focus:outline-none focus:ring-1 focus:ring-primary" 
					items={[
						{ value: 'user', label: 'User (Default)' },
						{ value: 'editor', label: 'Editor' },
						{ value: 'admin', label: 'Admin' },
					]}
					{...roleProps}
				/>
			</AFormField>
		</>
	)
}
