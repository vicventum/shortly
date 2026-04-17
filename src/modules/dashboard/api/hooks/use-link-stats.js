import { useFetch } from '@/modules/core/api/hooks/use-fetch'
import { getLinkStats } from '@/modules/dashboard/api/services/service-links'
import { fetchLinkStats as fetchLinkStatsProvider } from '@/modules/dashboard/api/providers/provider-links-fetch'
import { useAuth } from '@/modules/auth/hooks/use-auth'

export function useLinkStats(options = {}) {
  const { user } = useAuth()
  const userId = user?.id

  return useFetch({
    queryKey: ['linkStats', userId],
    queryFn: async ({ signal }) => {
      return await getLinkStats(fetchLinkStatsProvider, { signal })
    },
    enabled: !!userId,
    ...options
  })
}
