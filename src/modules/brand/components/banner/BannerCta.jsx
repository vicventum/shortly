import { BaseButton } from '@/modules/core/components/base/BaseButton'

export function BannerCta({ ...prop }) {
  return (
    <div className='bg-boost-pattern-mobile md:bg-boost-pattern-desktop bg-secondary bg-cover py-24 text-center md:py-16'>
      <h2 className='text-white'>Boost your links today</h2>

      <BaseButton className='mt-7 md:mt-9' variant='rounded' size='lg'>
        Get started
      </BaseButton>
    </div>
  )
}
