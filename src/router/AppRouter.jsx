import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicLayout } from '@/modules/core/layouts/PublicLayout'
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout'
import { AuthLayout } from '@/modules/auth/layout/AuthLayout'
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AdminPage } from '@/pages/AdminPage'
import { EditorPage } from '@/pages/EditorPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { UnauthorizedPage } from '@/pages/UnauthorizedPage'
import { ProtectedRoute } from '@/router/ProtectedRoute'

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<HomePage />} />
				</Route>

				{/* Guest Routes (Redirects if authenticated) */}
				<Route element={<ProtectedRoute requireAuth={false} requireGuest />}>
					<Route path="/" element={<AuthLayout />}>
						<Route path="register" element={<RegisterPage />} />
						<Route path="login" element={<LoginPage />} />
					</Route>
				</Route>

				{/* Private Routes (Require Authentication) */}
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route path="dashboard" element={<DashboardPage />} />
					</Route>
				</Route>

				{/* Routes with Specific Roles */}
				<Route element={<ProtectedRoute roles={['admin']} />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route path="admin" element={<AdminPage />} />
					</Route>
				</Route>

				{/* Routes with Specific Permissions */}
				<Route element={<ProtectedRoute permissions={['content:write']} />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route path="editor" element={<EditorPage />} />
					</Route>
				</Route>

				<Route element={<ProtectedRoute permissions={['settings:access']} />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route path="settings" element={<SettingsPage />} />
					</Route>
				</Route>

				{/* Unauthorized Page */}
				<Route path="/unauthorized" element={<PublicLayout />}>
					<Route index element={<UnauthorizedPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
