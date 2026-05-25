import { LMainSection } from '@/modules/_core/components/layout/LMainSection'
import { SectionProfileSettings } from '@/modules/settings/features/profile/components/section/SectionProfileSettings'

export function SettingsPage() {
	return (
		<LMainSection title='ConfiguraciÃ³n del Perfil'>
			<title>Settings â€” Shortly</title>
			<meta name="description" content="Manage your account settings." />
			<SectionProfileSettings />
		</LMainSection >
	)
}


