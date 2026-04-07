import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { PublicLayout } from '@/modules/core/layouts/PublicLayout'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<HomePage />} />
				</Route>
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	)
}
