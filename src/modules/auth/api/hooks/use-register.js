import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { register } from '@/modules/auth/api/services/service-auth'
import { registerUser as registerProvider } from '@/modules/auth/api/providers/provider-auth-fetch'
import { useSession } from '@/modules/auth/hooks/use-session'

export function useRegister(options = {}) {
	const { setSession } = useSession()

	const mutation = useMutation({
		mutationFn: async ({ variables }) => {
			return await register(registerProvider, { payload: variables })
		},
		onSuccess: (data, variables) => {
			setSession(data.user, data.accessToken, data.refreshToken)
			if (options.onSuccess) options.onSuccess(data, variables)
		},
		...options,
	})

	return mutation
}
