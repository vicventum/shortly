import { Outlet } from 'react-router'
import { DashboardHeader } from '@/modules/dashboard/components/layout/LayoutDashboardHeader'
import { DashboardSidebar } from '@/modules/dashboard/components/layout/LayoutDashboardSidebar'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function DashboardLayout() {
	const { user } = useAuth()

	return (
		<div className="drawer lg:drawer-open min-h-screen bg-base-200/50">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col min-h-screen">
				<DashboardHeader />
				<main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8">
					<Outlet />
				</main>
			</div>

			<div className="drawer-side z-40">
				<label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<DashboardSidebar user={user} />
			</div>
		</div>
	)
}
