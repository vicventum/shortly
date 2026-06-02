import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'

import { coreRoutes } from '@/modules/_core/core.routes'
import { brandRoutes } from '@/modules/brand/brand.routes'
import { authRoutes } from '@/modules/auth/auth.routes'
import { linksRoutes } from '@/modules/links/links.routes'
import { settingsRoutes } from '@/modules/settings/settings.routes'

function RouterConfig() {
	const element = useRoutes([
		...coreRoutes,
		...brandRoutes,
		...authRoutes,
		...linksRoutes,
		...settingsRoutes
	])
	return element
}

export function AppRouter() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterConfig />
			</Suspense>
		</BrowserRouter>
	)
}
