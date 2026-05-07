import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { updateProfile } from '@/modules/settings/api/services/service-profile'
import { updateProfile as updateProfileProvider } from '@/modules/settings/api/providers/provider-profile-fetch'
import { useSession } from '@/modules/auth/hooks/use-session'

export function useUpdateProfile(options = {}) {
  const { user, updateUser } = useSession()

  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      // json-server PATCH /users/:id
      return await updateProfile(updateProfileProvider, {
        signal,
        payload: { id: user.id, ...variables }
      })
    },
    onSuccess: (updatedUser, variables) => {
      // Sync session state without invalidating tokens
      updateUser(updatedUser)
      if (options.onSuccess) {
        options.onSuccess(updatedUser, variables)
      }
    },
    meta: {
      showSuccessToast: true,
      successMessage: 'Perfil actualizado exitosamente',
      errorMessage: 'Error al actualizar el perfil'
    },
    ...options
  })
}
