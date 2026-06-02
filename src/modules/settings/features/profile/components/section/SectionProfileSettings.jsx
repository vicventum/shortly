import { ACard } from '@/modules/_core/components/atom/ACard'
import { FormProfileSettings } from '@/modules/settings/features/profile/components/form/FormProfileSettings'

export function SectionProfileSettings() {
	return (
		<div>
			<ACard className="max-w-4xl mx-auto p-5 md:p-8">
				<FormProfileSettings />
			</ACard>
		</div>
	)
}


