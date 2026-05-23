import { AButton } from '@/modules/core/components/atom/AButton'

export function BannerCta({ ...prop }) {
  return (
    <div className='bg-secondary bg-boost-pattern-mobile bg-cover py-24 text-center md:bg-boost-pattern-desktop md:py-16'>
      <h2 className='text-white'>Boost your links today</h2>

      <AButton className='mt-7 md:mt-9' variant='rounded' size='lg'>
        Get started
      </AButton>
    </div>
  )
}
