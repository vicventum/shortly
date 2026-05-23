import { LayoutMainSection } from '@/modules/core/components/layout/LayoutMainSection'
import { SectionMetrics } from '@/modules/links/features/management/components/section/SectionMetrics'
import { SectionShortenForm } from '@/modules/links/features/management/components/section/SectionShortenForm'
import { SectionLinksTimeline } from '@/modules/links/features/management/components/section/SectionLinksTimeline'
import { useLinks } from '@/modules/links/features/management/api/use-links'
import { useLinkStats } from '@/modules/links/features/management/api/use-link-stats'

export function DashboardPage() {
	const { data: stats, isLoading: isLoadingStats, refetch: refetchStats } = useLinkStats()
	const { data: links, isLoading: isLoadingLinks, refetch: refetchLinks } = useLinks()

	const handleRefresh = () => {
		refetchStats()
		refetchLinks()
	}

	return (
		<LayoutMainSection title='Link Management'>
			<title>Dashboard â€” Shortly</title>
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


