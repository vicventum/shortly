import { useContextCheck } from '@/modules/core/hooks/use-context-check'
import { AuthContext } from '@/modules/auth/contexts/context-auth'
import { ROLE_PERMISSIONS } from '@/modules/auth/constants/auth-roles'

export function useAuth() {
  const context = useContextCheck(AuthContext, 'useAuth')

  const hasRole = (role) => {
    return context.user?.role === role
  }

  const hasPermission = (permission) => {
    if (!context.user?.role) return false
    const permissions = ROLE_PERMISSIONS[context.user.role] || []
    return permissions.includes(permission)
  }

  const hasAnyPermission = (permissions = []) => {
    return permissions.some((p) => hasPermission(p))
  }

  const hasAllPermissions = (permissions = []) => {
    return permissions.length > 0 && permissions.every((p) => hasPermission(p))
  }

  return {
    ...context,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
