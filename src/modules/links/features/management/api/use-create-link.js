import { useMutation } from '@/modules/core/api/hooks/use-mutation'
import { createLink } from '@/modules/links/shared/api/services/service-links'
import { createLink as createLinkProvider } from '@/modules/links/shared/api/providers/provider-links-fetch'

export function useCreateLink(options = {}) {
  return useMutation({
    mutationFn: async ({ variables, signal }) => {
      return await createLink(createLinkProvider, { signal, payload: variables })
    },
    ...options
  })
}

