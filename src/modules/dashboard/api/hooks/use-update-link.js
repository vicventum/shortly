import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { updateLink } from '@/modules/dashboard/api/services/service-links'
import { updateLink as updateLinkProvider } from '@/modules/dashboard/api/providers/provider-links-fetch'

export function useUpdateLink(options = {}) {
  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      return await updateLink(updateLinkProvider, { signal, payload: variables })
    },
    ...options
  })
}
