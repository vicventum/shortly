import { LayoutMainSection } from '@/modules/core/components/layout/LayoutMainSection'
import { SectionProfileSettings } from '@/modules/settings/features/profile/components/section/SectionProfileSettings'

export function SettingsPage() {
	return (
		<LayoutMainSection title='ConfiguraciÃ³n del Perfil'>
			<title>Settings â€” Shortly</title>
			<meta name="description" content="Manage your account settings." />
			<SectionProfileSettings />
		</LayoutMainSection >
	)
}


