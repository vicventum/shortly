import { useFetch } from '@/modules/_core/api/hooks/use-fetch'
import { getLinks } from '@/modules/links/_shared/api/services/service-links'
import { fetchLinks as fetchLinksProvider } from '@/modules/links/_shared/api/providers/provider-links-fetch'
import { useSession } from '@/modules/auth/_shared/hooks/use-session'

export function useLinks(options = {}) {
  const { user } = useSession()
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

