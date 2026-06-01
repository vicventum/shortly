import { useMutation } from '@/modules/_core/api/hooks/use-mutation'
import { updateLink } from '@/modules/links/_shared/api/services/service-links'
import { updateLink as updateLinkProvider } from '@/modules/links/_shared/api/providers/provider-links-fetch'

export function useUpdateLink(options = {}) {
  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      return await updateLink(updateLinkProvider, { signal, payload: variables })
    },
    ...options
  })
}

