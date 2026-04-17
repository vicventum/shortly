import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function ProtectedRoute({
  requireAuth = true,
  requireGuest = false,
  roles = [],
  permissions = [],
  redirectTo = '/login',
  fallback = null, // Can be a loading spinner component
}) {
  const { isAuthenticated, isLoading, hasRole, hasPermission } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return fallback || (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  // Si requiere ser guest y está autenticado -> redirige al dashboard (o de dónde venía)
  if (requireGuest && isAuthenticated) {
    let from = location.state?.from?.pathname || '/dashboard'
    if (from === '/') from = '/dashboard'
    return <Navigate to={from} replace />
  }

  // Si requiere autenticación y NO lo está -> redirige a login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Si requiere roles y no tiene ninguno de los permitidos
  if (roles.length > 0) {
    const hasAllowedRole = roles.some(hasRole)
    if (!hasAllowedRole) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  // Si requiere permisos y no los tiene (todas las requeridas en este caso, se puede ajustar)
  if (permissions.length > 0) {
    const hasRequiredPermissions = permissions.every(hasPermission)
    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <Outlet />
}
