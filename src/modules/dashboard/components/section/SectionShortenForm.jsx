import { ACard } from '@/modules/core/components/atom/ACard'
import { FormDashboardUrl } from '@/modules/dashboard/components/form/FormDashboardUrl'

export function SectionShortenForm({ onRefresh }) {
  return (
    <section className='mt-8 w-full'>
      <ACard>
        <FormDashboardUrl onRefresh={onRefresh} />
      </ACard>
    </section>
  )
}
