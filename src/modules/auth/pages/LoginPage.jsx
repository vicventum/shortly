import { ACard } from '@/modules/core/components/atom/ACard'
import { FormLogin } from '@/modules/auth/components/form/FormLogin'

export function LoginPage() {
	return (
		<ACard className='px-8 py-10 shadow-lg md:px-10'>
			<h2 className='text-center text-2xl font-bold text-secondary'>
				Log in to your account
			</h2>

			<FormLogin />
		</ACard>
	)
}
