import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { getLinks } from '@/modules/dashboard/api/services/service-links'
import { fetchLinks as fetchLinksProvider } from '@/modules/dashboard/api/providers/provider-links-fetch'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function useLinks(options = {}) {
  const { user } = useAuth()
  const userId = user?.id

  return useFetch({
    queryKey: ['links', userId],
    queryFn: async ({ signal }) => {
      return await getLinks(fetchLinksProvider, { signal, payload: { userId } })
    },
    enabled: !!userId,
    ...options
  })
}
