import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { PublicLayout } from '@/modules/core/layouts/PublicLayout'

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
