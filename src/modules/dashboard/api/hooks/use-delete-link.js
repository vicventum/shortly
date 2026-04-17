import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { deleteLink } from '@/modules/dashboard/api/services/service-links'
import { deleteLink as deleteLinkProvider } from '@/modules/dashboard/api/providers/provider-links-fetch'

export function useDeleteLink(options = {}) {
  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      return await deleteLink(deleteLinkProvider, { signal, payload: variables })
    },
    ...options
  })
}
