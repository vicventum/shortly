import { LayoutMainSection } from '@/modules/core/components/layout/LayoutMainSection'
import { SectionMetrics } from '@/modules/dashboard/components/section/SectionMetrics'
import { SectionShortenForm } from '@/modules/dashboard/components/section/SectionShortenForm'
import { SectionLinksTimeline } from '@/modules/dashboard/components/section/SectionLinksTimeline'
import { useLinks } from '@/modules/dashboard/api/hooks/use-links'
import { useLinkStats } from '@/modules/dashboard/api/hooks/use-link-stats'

export function DashboardPage() {
	const { data: stats, isLoading: isLoadingStats, refetch: refetchStats } = useLinkStats()
	const { data: links, isLoading: isLoadingLinks, refetch: refetchLinks } = useLinks()

	const handleRefresh = () => {
		refetchStats()
		refetchLinks()
	}

	return (
		<LayoutMainSection title='Link Management'>
			<title>Dashboard — Shortly</title>
			<meta name="description" content="Manage and track your shortened links." />
			<section className='mb-8'>
				<SectionMetrics data={stats} isLoading={isLoadingStats} />
			</section>
			<section className='mb-10'>
				<SectionShortenForm onRefresh={handleRefresh} />
			</section>
			<section>
				<SectionLinksTimeline links={links} isLoading={isLoadingLinks} onRefresh={handleRefresh} />
			</section>
		</LayoutMainSection>
	)
}
