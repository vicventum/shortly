import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { register } from '@/modules/auth/api/services/service-auth'
import { registerUser as registerProvider } from '@/modules/auth/api/providers/provider-auth-localstorage'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function useRegister(options = {}) {
  const { registerContext } = useAuth()

  const mutation = useMutation({
    mutationFn: async ({ variables }) => {
      return await register(registerProvider, { payload: variables })
    },
    onSuccess: (data, variables) => {
      registerContext(data.user, data.accessToken, data.refreshToken)
      if (options.onSuccess) options.onSuccess(data, variables)
    },
    ...options,
  })

  return mutation
}
