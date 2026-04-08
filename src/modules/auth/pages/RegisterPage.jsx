import { ACard } from '@/modules/core/components/atom/ACard'
import { FormRegister } from '@/modules/auth/components/form/FormRegister'

export function RegisterPage() {
  return (
    <ACard className='px-8 py-10 shadow-lg md:px-10'>
      <h2 className='text-center text-2xl font-bold text-secondary'>
        Create your account
      </h2>

      <FormRegister />
    </ACard>
  )
}
