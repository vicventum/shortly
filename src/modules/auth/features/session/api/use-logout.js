import { useMutation } from '@/modules/_core/api/hooks/use-mutation'
import { logout } from '@/modules/auth/_shared/api/services/service-auth'
import { logoutUser as logoutProvider } from '@/modules/auth/_shared/api/providers/provider-auth-fetch'
import { useSession } from '@/modules/auth/_shared/hooks/use-session'

export function useLogout(options = {}) {
  const { cleanSession } = useSession()

  const mutation = useMutation({
    mutationFn: async () => {
      return await logout(logoutProvider)
    },
    onSuccess: (data, variables) => {
      cleanSession()
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

