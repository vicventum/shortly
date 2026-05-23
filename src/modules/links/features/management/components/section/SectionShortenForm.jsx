import { ACard } from '@/modules/core/components/atom/ACard'
import { FormDashboardUrl } from '@/modules/links/features/management/components/form/FormDashboardUrl'

export function SectionShortenForm({ onRefresh }) {
	return (
		<div>
			<ACard>
				<FormDashboardUrl onRefresh={onRefresh} />
			</ACard>
		</div>
	)
}


