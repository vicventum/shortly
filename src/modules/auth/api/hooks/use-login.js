import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { login } from '@/modules/auth/api/services/service-auth'
import { loginUser as loginProvider } from '@/modules/auth/api/providers/provider-auth-fetch'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function useLogin(options = {}) {
	const { loginContext } = useAuth()

	const mutation = useMutation({
		mutationFn: async ({ variables }) => {
			return await login(loginProvider, { payload: variables })
		},
		onSuccess: (data, variables) => {
			loginContext(data.user, data.accessToken, data.refreshToken)
			if (options.onSuccess) options.onSuccess(data, variables)
		},
		...options,
	})

	return mutation
}
