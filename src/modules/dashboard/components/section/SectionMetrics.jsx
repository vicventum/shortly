import { CardMetric } from '@/modules/dashboard/components/card/CardMetric'

export function SectionMetrics({ data, isLoading }) {
  const totalLinks = data?.totalLinks || 0
  const totalClicks = data?.totalClicks || 0
  const mostPopular = data?.mostPopular || null

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-6">
      <CardMetric 
        icon="ph:link"
        label="Total enlaces"
        value={isLoading ? '...' : totalLinks}
      />
      <CardMetric 
        icon="ph:cursor-click"
        label="Total clics"
        value={isLoading ? '...' : totalClicks}
      />
      <CardMetric 
        icon="ph:trend-up"
        label="Más popular"
        value={isLoading ? '...' : (mostPopular ? `${mostPopular.clicks} clics` : '0 clics')}
        subtitle={mostPopular ? mostPopular.shortUrl : 'Ninguno'}
      />
    </section>
  )
}
