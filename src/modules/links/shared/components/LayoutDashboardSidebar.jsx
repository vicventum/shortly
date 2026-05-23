import { DashboardSidebarNav } from './LayoutDashboardSidebarNav'
import { ABadge } from '@/modules/core/components/atom/ABadge'
import { AAvatar } from '@/modules/core/components/atom/AAvatar'

export function DashboardSidebar({ user }) {
	return (
		<aside className="bg-base-100 w-64 min-h-screen flex flex-col pt-6 px-4 pb-8 border-r border-base-200">
			{/* User Info */}
			<div className="flex flex-col items-center text-center px-4">

				<AAvatar 
					src={user?.avatar} 
					alt={user?.name || 'User'} 
					className="mb-4"
				/>

				<h2 className="text-lg font-bold text-base-content mb-1">
					{user?.name || 'User'}
				</h2>
				<p className="text-xs text-base-content/60 mb-3 truncate w-full">
					{user?.email || 'user@example.com'}
				</p>

				{user?.role && (
					<ABadge color="secondary" size="sm">
						{user.role}
					</ABadge>
				)}
			</div>

			<DashboardSidebarNav />
		</aside>
	)
}
