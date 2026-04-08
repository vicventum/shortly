import { ACard } from '@/modules/core/components/atom/ACard'
import { FormRegister } from '@/modules/auth/components/form/FormRegister'

export function RegisterPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-base-200 px-4 py-12'>
      <div className='w-full max-w-[450px] space-y-8'>
        <h1 className='text-center text-5xl font-bold text-secondary'>Shortly</h1>

        <ACard className='px-8 py-10 shadow-lg md:px-10'>
          <h2 className='text-center text-2xl font-bold text-secondary'>
            Create your account
          </h2>

          <FormRegister />
        </ACard>
      </div>
    </main>
  )
}
