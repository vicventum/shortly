import { CardMetric } from '@/modules/dashboard/components/card/CardMetric'
import { DASHBOARD_METRICS } from '@/modules/dashboard/constants/dashboard-mock-data'

export function SectionMetrics() {
  const { totalLinks, totalClicks, mostPopular } = DASHBOARD_METRICS

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-6">
      <CardMetric 
        icon="ph:link"
        label="Total enlaces"
        value={totalLinks}
      />
      <CardMetric 
        icon="ph:cursor-click"
        label="Total clics"
        value={totalClicks}
      />
      <CardMetric 
        icon="ph:trend-up"
        label="Más popular"
        value={`${mostPopular.clicks} clics`}
        subtitle={mostPopular.url}
      />
    </section>
  )
}
