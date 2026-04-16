import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { logout } from '@/modules/auth/api/services/service-auth'
import { logoutUser as logoutProvider } from '@/modules/auth/api/providers/provider-auth-fetch'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function useLogout(options = {}) {
  const { logout: logoutContext } = useAuth()

  const mutation = useMutation({
    mutationFn: async () => {
      return await logout(logoutProvider)
    },
    onSuccess: (data, variables) => {
      logoutContext()
      // Call user's onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables)
      }
    },
    ...options,
  })

  // To match useMutation signature while keeping context behavior isolated
  return mutation
}
