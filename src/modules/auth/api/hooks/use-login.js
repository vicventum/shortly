import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { login } from '@/modules/auth/api/services/service-auth'
import { loginUser as loginProvider } from '@/modules/auth/api/providers/provider-auth-localstorage'

export function useLogin(options = {}) {
  const mutation = useMutation({
    mutationFn: async ({ variables }) => {
      return await login(loginProvider, { payload: variables })
    },
    ...options,
  })

  return mutation
}
