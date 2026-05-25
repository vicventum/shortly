import { useFetch } from '@/modules/_core/api/hooks/use-fetch'
import { getLinkStats } from '@/modules/links/_shared/api/services/service-links'
import { fetchLinkStats as fetchLinkStatsProvider } from '@/modules/links/_shared/api/providers/provider-links-fetch'
import { useSession } from '@/modules/auth/_shared/hooks/use-session'

export function useLinkStats(options = {}) {
  const { user } = useSession()
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

