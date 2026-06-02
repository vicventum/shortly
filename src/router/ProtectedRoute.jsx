import { Navigate, Outlet, useLocation } from 'react-router'
import { useSession } from '@/modules/auth/_shared/hooks/use-session'

export function ProtectedRoute({
  requireAuth = true,
  requireGuest = false,
  roles = [],
  permissions = [],
  redirectTo = '/login',
  fallback = null, // Can be a loading spinner component
}) {
  const { isAuthenticated, hasRole, hasPermission } = useSession()
  const location = useLocation()

  // Si requiere ser guest y estÃ¡ autenticado -> redirige al dashboard (o de dÃ³nde venÃ­a)
  if (requireGuest && isAuthenticated) {
    let from = location.state?.from?.pathname || '/dashboard'
    if (from === '/') from = '/dashboard'
    return <Navigate to={from} replace />
  }

  // Si requiere autenticaciÃ³n y NO lo estÃ¡ -> redirige a login
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

