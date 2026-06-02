import { useMutation } from '@/modules/_core/api/hooks/use-mutation'
import { deleteLink } from '@/modules/links/_shared/api/services/service-links'
import { deleteLink as deleteLinkProvider } from '@/modules/links/_shared/api/providers/provider-links-fetch'

export function useDeleteLink(options = {}) {
  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      return await deleteLink(deleteLinkProvider, { signal, payload: variables })
    },
    ...options
  })
}

