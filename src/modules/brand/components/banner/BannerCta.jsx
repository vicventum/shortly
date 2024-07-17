import { BaseButton } from '@/modules/core/components/base/BaseButton'

export function BannerCta({ ...prop }) {
  return (
    <div className='bg-boost-pattern bg-secondary bg-cover py-16 text-center'>
      <h2 className='text-base-100'>Boost your links today</h2>

      <BaseButton className='mt-9' variant='rounded' size='lg'>
        Get started
      </BaseButton>
    </div>
  )
}
