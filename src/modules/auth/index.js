// Public API: auth module
// Pages (consumed by AppRouter)
export { LoginPage } from './pages/LoginPage'
export { RegisterPage } from './pages/RegisterPage'

// Layout (consumed by AppRouter)
export { AuthLayout } from './layouts/AuthLayout'

// Hooks (consumed by cross-module components like _core's LHeader)
export { useSession } from './_shared/hooks/use-session'

// Session API (consumed by cross-module components)
export { useLogout } from './features/session/api/use-logout'
export { useVerifySession } from './features/session/api/use-verify-session'

// Context (consumed by App.jsx or providers)
export { AuthContextProvider, AuthContext } from './_shared/contexts/context-auth'

// Constants (consumed by ProtectedRoute and other guards)
export { ROLES, PERMISSIONS, ROLE_PERMISSIONS } from './_shared/constants/auth-roles'

// Store (consumed by cross-module state reads)
export { useSessionStore, selectUser, selectIsAuthenticated } from './_shared/stores/store-session'
