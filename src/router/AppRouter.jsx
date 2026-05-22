import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicLayout } from '@/modules/core/layouts/PublicLayout'
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout'
import { AuthLayout } from '@/modules/auth/layout/AuthLayout'
import { ProtectedRoute } from '@/router/ProtectedRoute'

// Static Imports for Critical/Public Routes (Immediate LCP)
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { UnauthorizedPage } from '@/pages/UnauthorizedPage'

// Lazy Imports for Private/Heavy Routes
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })))
const EditorPage = lazy(() => import('@/pages/EditorPage').then((m) => ({ default: m.EditorPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))

export function AppRouter() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
		</BrowserRouter>
	)
}
