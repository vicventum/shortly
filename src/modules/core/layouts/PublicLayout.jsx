import { Outlet } from 'react-router'
import { LayoutHeader } from '@/modules/core/components/layout/LayoutHeader'
import { LayoutFooter } from '@/modules/core/components/layout/LayoutFooter'


export function PublicLayout() {
	return (
		<>
			<LayoutHeader />
			<Outlet />
			<LayoutFooter />
		</>
	)
}
