import { useSessionStore } from '@/modules/auth/stores/store-session'
import { ROLE_PERMISSIONS } from '@/modules/auth/constants/auth-roles'

export function useSession() {
  const user = useSessionStore((state) => state.user)
  const setSession = useSessionStore((state) => state.setSession)
  const cleanSession = useSessionStore((state) => state.cleanSession)
  const getAccessToken = useSessionStore((state) => state.getAccessToken)

  const hasRole = (role) => {
    return user?.role === role
  }

  const hasPermission = (permission) => {
    if (!user?.role) return false
    const permissions = ROLE_PERMISSIONS[user.role] || []
    return permissions.includes(permission)
  }

  const hasAnyPermission = (permissions = []) => {
    return permissions.some((p) => hasPermission(p))
  }

  const hasAllPermissions = (permissions = []) => {
    return permissions.length > 0 && permissions.every((p) => hasPermission(p))
  }

  return {
    user,
    isAuthenticated: !!user,
    setSession,
    cleanSession,
    getAccessToken,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
