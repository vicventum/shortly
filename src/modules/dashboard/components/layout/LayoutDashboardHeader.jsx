import { Link } from 'react-router'
import { Icon } from '@iconify/react'
import { ALogo } from '@/modules/core/components/atom/ALogo'
import { AButton } from '@/modules/core/components/atom/AButton'
import { DThemeSwitch } from '@/modules/core/components/design/DThemeSwitch'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { useLogout } from '@/modules/auth/api/hooks/use-logout'
import { ADivider } from '@/modules/core/components/atom/ADivider'

export function DashboardHeader() {
	const { user } = useAuth()
	const { mutate: logout } = useLogout()

	return (
		<header className="navbar bg-base-100 border-b border-base-200 h-[72px] sticky top-0 z-30 justify-center">
			<div className="w-full flex justify-between items-center px-4 md:px-8 text-base-300">
				<div className="flex items-center gap-2">
					{/* Hamburger limit para mobile drawer */}
					<label
						htmlFor="dashboard-drawer"
						className="btn btn-ghost btn-circle drawer-button lg:hidden"
					>
						<Icon className="size-6" icon="radix-icons:hamburger-menu" />
					</label>
					{/* Logo */}
					<ALogo className="max-md:scale-75 origin-left w-24" />
				</div>

				<div className="flex items-center gap-4 md:gap-6">
					<DThemeSwitch />
					<ADivider
						className='mx-0 hidden md:flex'
						orientation='vertical'
						color='base-200'
						size='sm'
					/>
					<div className="hidden md:flex items-center gap-2 text-sm">
						<span>Hello, <span className="font-bold">{user?.name?.split(' ')[0] || 'User'}</span></span>
					</div>

					<AButton
						variant="ghost"
						className="hover:text-base-content px-2 md:px-4"
						onClick={logout}
					>
						<Icon className="size-5" icon="ph:sign-out-bold" />
						<span className="hidden md:inline font-semibold">Log out</span>
					</AButton>
				</div>
			</div>
		</header>
	)
}
