import { ACard } from '@/modules/core/components/atom/ACard'
import { FormDashboardUrl } from '@/modules/dashboard/components/form/FormDashboardUrl'

export function SectionShortenForm() {
  return (
    <section className='mt-8 w-full'>
      <ACard>
        <FormDashboardUrl />
      </ACard>
    </section>
  )
}
