import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { login } from '@/modules/auth/api/services/service-auth'
import { loginUser as loginProvider } from '@/modules/auth/api/providers/provider-auth-fetch'
import { useSession } from '@/modules/auth/hooks/use-session'

export function useLogin(options = {}) {
	const { setSession } = useSession()

	const mutation = useMutation({
		mutationFn: async ({ variables }) => {
			return await login(loginProvider, { payload: variables })
		},
		onSuccess: (data, variables) => {
			setSession(data.user, data.accessToken, data.refreshToken)
			if (options.onSuccess) options.onSuccess(data, variables)
		},
		...options,
	})

	return mutation
}
