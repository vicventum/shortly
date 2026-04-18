import { CardMetric } from '@/modules/dashboard/components/card/CardMetric'

export function SectionMetrics({ data, isLoading }) {
	const totalLinks = data?.totalLinks || 0
	const totalClicks = data?.totalClicks || 0
	const mostPopular = data?.mostPopular || null

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
			<CardMetric
				icon="ph:link"
				label="Total links"
				value={isLoading ? '...' : totalLinks}
			/>
			<CardMetric
				icon="ph:cursor-click"
				label="Total clicks"
				value={isLoading ? '...' : totalClicks}
			/>
			<CardMetric
				icon="ph:trend-up"
				label="Most popular"
				value={isLoading ? '...' : (mostPopular ? `${mostPopular.clicks} clicks` : '0 clicks')}
				subtitle={mostPopular ? mostPopular.shortUrl : 'None'}
			/>
		</div>
	)
}
