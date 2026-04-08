import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicLayout } from '@/modules/core/layouts/PublicLayout'
import { AuthLayout } from '@/modules/auth/layout/AuthLayout'
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { LoginPage } from '@/modules/auth/pages/LoginPage'

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<HomePage />} />
				</Route>
				<Route path="/" element={<AuthLayout />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
