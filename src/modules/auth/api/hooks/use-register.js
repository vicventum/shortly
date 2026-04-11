import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { register } from '@/modules/auth/api/services/service-auth'
import { registerUser as registerProvider } from '@/modules/auth/api/providers/provider-auth-localstorage'

export function useRegister(options = {}) {
  const mutation = useMutation({
    mutationFn: async ({ variables }) => {
      return await register(registerProvider, { payload: variables })
    },
    ...options,
  })

  return mutation
}
