import { LayoutMainSection } from '@/modules/core/components/layout/LayoutMainSection'
import { SectionProfileSettings } from '@/modules/settings/components/section/SectionProfileSettings'

export function SettingsPage() {
	return (
		<LayoutMainSection title='Configuración del Perfil'>
			<title>Settings — Shortly</title>
			<meta name="description" content="Manage your account settings." />
			<SectionProfileSettings />
		</LayoutMainSection >
	)
}
