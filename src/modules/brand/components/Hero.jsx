import { BaseButton } from '@/modules/core/components/base/BaseButton'

export function Hero() {
  return (
    <>
      <div className='hero h-[550px] bg-hero-image bg-[size:45%] bg-[position:center_right] bg-no-repeat'>
        {/* <div className={`hero h-4/5 bg-[url(${IllustrationWorking})]`}> */}
        <div className='container grid grid-cols-[60%_1fr]'>
          <div>
            <h1 className=''>More than just shorter links</h1>
            <p className='mt-2 text-balance text-subtitle'>
              Build your brand’s recognition and get detailed insights on how
              your links are performing.
            </p>
            <BaseButton className='mt-8' variant='rounded' size='lg'>
              Get started
            </BaseButton>
          </div>
        </div>
      </div>
    </>
  )
}
