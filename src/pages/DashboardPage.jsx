import { SectionMetrics } from '@/modules/dashboard/components/section/SectionMetrics'
import { SectionShortenForm } from '@/modules/dashboard/components/section/SectionShortenForm'
import { SectionLinksTimeline } from '@/modules/dashboard/components/section/SectionLinksTimeline'

export function DashboardPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-base-content mb-8 tracking-tight">
        Gestión de Enlaces
      </h1>
      <SectionMetrics />
      <SectionShortenForm />
      <SectionLinksTimeline />
    </div>
  )
}
