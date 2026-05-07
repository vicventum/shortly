import { Icon } from '@iconify/react'
import { AInput } from '@/modules/core/components/atom/AInput'
import { AAvatar } from '@/modules/core/components/atom/AAvatar'
import { AFormField } from '@/modules/core/components/atom/AFormField'
import { ASelect } from '@/modules/core/components/atom/ASelect'
import { ATextarea } from '@/modules/core/components/atom/ATextarea'

export function FieldsProfileSettings({ getFieldProps, userRole, avatarUrl }) {
	const emailProps = getFieldProps('email')
	const roleProps = getFieldProps('role')

	const isAdmin = userRole === 'admin'

	return (
		<div className='flex flex-col gap-6'>
			{/* Avatar URL Field with Preview */}
			<div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
				<AAvatar src={avatarUrl} alt='Avatar preview' sizeClass='size-20 md:size-16' />
				<AFormField label='URL de la foto de perfil' invalidMessage={getFieldProps('avatarUrl').invalidMessage} className='flex-1 w-full'>
					<AInput
						placeholder='https://i.pravatar.cc/150?img=32'
						className='input-bordered'
						{...getFieldProps('avatarUrl')}
						leftSlot={<Icon icon='ph:image' className='size-5 text-base-300' />}
					/>
				</AFormField>
			</div>

			{/* 2-column Grid */}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				<div>
					<AFormField label='Nombre completo' labelIcon='ph:user' invalidMessage={getFieldProps('name').invalidMessage}>
						<AInput
							placeholder='Tu nombre'
							className='input-bordered'
							{...getFieldProps('name')}
						/>
					</AFormField>
				</div>

				<div>
					<AFormField label='Correo electrónico' labelIcon='ph:envelope' invalidMessage={emailProps.invalidMessage} help='El correo no se puede modificar'>
						<AInput
							type='email'
							placeholder='correo@ejemplo.com'
							className='input-bordered bg-base-200'
							disabled
							{...emailProps}
						/>
					</AFormField>
				</div>

				<div>
					<AFormField label='Rol' invalidMessage={roleProps.invalidMessage}>
						<ASelect
							className={`${!isAdmin ? 'bg-base-200' : ''}`}
							disabled={!isAdmin}
							items={[
								{ value: 'user', label: 'Usuario' },
								{ value: 'editor', label: 'Editor' },
								{ value: 'admin', label: 'Administrador' },
							]}
							{...roleProps}
						/>
					</AFormField>
				</div>

				<div>
					<AFormField label='Teléfono' labelIcon='ph:phone' invalidMessage={getFieldProps('phone').invalidMessage}>
						<AInput
							placeholder='+34 600 000 000'
							className='input-bordered'
							type='tel'
							{...getFieldProps('phone')}
						/>
					</AFormField>
				</div>

				<div className='md:col-span-2'>
					<AFormField label='Sitio web' labelIcon='ph:globe' invalidMessage={getFieldProps('website').invalidMessage}>
						<AInput
							placeholder='https://tudominio.com'
							type='url'
							className='input-bordered'
							{...getFieldProps('website')}
						/>
					</AFormField>
				</div>

				<div className='md:col-span-2'>
					<AFormField label='Biografía' labelIcon='ph:file-text' invalidMessage={getFieldProps('biography').invalidMessage}>
						<ATextarea
							className='h-24'
							placeholder='Desarrolladora frontend apasionada por crear interfaces...'
							{...getFieldProps('biography')}
						/>
					</AFormField>
				</div>
			</div>
		</div>
	)
}
