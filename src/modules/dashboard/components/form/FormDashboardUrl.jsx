import { Icon } from '@iconify/react'
import { AButton } from '@/modules/core/components/atom/AButton'

export function FormDashboardUrl() {
  return (
    <form className='flex flex-col gap-4 bg-base-100 md:flex-row'>
      <label className='input-bordered input flex flex-1 items-center gap-2'>
        <Icon icon='ph:plus-bold' className='size-5 text-base-300' />

        <input
          type='text'
          className='grow'
          placeholder='Pega un enlace para acortar...'
        />
      </label>

      <AButton size='md' className='w-full shrink-0 px-8 md:w-auto'>
        Acortar enlace
      </AButton>
    </form>
  )
}
