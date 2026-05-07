import { SectionProfileSettings } from '@/modules/settings/components/section/SectionProfileSettings'

export function SettingsPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-base-content mb-6 md:mb-8 tracking-tight text-center md:text-left">
        Configuración del Perfil
      </h1>
      
      <section>
        <SectionProfileSettings />
      </section>
    </div>
  )
}
