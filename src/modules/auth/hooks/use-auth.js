import { useAuthStore } from '@/modules/auth/stores/store-auth'
import { ROLE_PERMISSIONS } from '@/modules/auth/constants/auth-roles'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const login = useAuthStore((state) => state.login)
  const register = useAuthStore((state) => state.register)
  const logout = useAuthStore((state) => state.logout)
  const getAccessToken = useAuthStore((state) => state.getAccessToken)

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
    isLoading,
    login,
    register,
    logout,
    getAccessToken,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
