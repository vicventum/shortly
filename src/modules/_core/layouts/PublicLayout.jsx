import { Outlet } from 'react-router'
import { LHeader } from '@/modules/_core/components/layout/LHeader'
import { LFooter } from '@/modules/_core/components/layout/LFooter'


export function PublicLayout() {
	return (
		<>
			<LHeader />
			<Outlet />
			<LFooter />
		</>
	)
}
