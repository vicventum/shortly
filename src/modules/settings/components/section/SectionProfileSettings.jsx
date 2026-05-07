import { ACard } from '@/modules/core/components/atom/ACard'
import { FormProfileSettings } from '@/modules/settings/components/form/FormProfileSettings'

export function SectionProfileSettings() {
	return (
		<div>
			<ACard className="max-w-4xl mx-auto p-5 md:p-8">
				<FormProfileSettings />
			</ACard>
		</div>
	)
}
