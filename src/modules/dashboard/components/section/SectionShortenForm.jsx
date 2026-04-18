import { ACard } from '@/modules/core/components/atom/ACard'
import { FormDashboardUrl } from '@/modules/dashboard/components/form/FormDashboardUrl'

export function SectionShortenForm({ onRefresh }) {
	return (
		<div>
			<ACard>
				<FormDashboardUrl onRefresh={onRefresh} />
			</ACard>
		</div>
	)
}
