import { BaseButton } from '@/modules/core/components/base/BaseButton'
import { BaseInput } from '@/modules/core/components/base/BaseInput'

export function FormUrl() {
  return (
    <>
      <div className='bg-shorten-pattern container rounded-xl bg-secondary bg-cover px-16 py-12'>
        <form className='form flex gap-x-6'>
          <BaseInput placeholder='Shorten a link here...' size='lg' />

          <BaseButton size='xl'>Shorten it!</BaseButton>
        </form>
      </div>
    </>
  )
}
