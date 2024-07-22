import { BaseButton } from '@/modules/core/components/base/BaseButton'

export function SectionHero() {
  return (
    <>
      <div className='hero bg-hero-image bg-[size:32rem] bg-[position:2rem_0] bg-no-repeat sm:bg-[position:55%_0] md:h-[550px] md:bg-[size:45%] md:bg-[position:center_right]'>
        {/* <div className={`hero h-4/5 bg-[url(${IllustrationWorking})]`}> */}
        <div className='container mt-96 grid text-center md:mt-0 md:grid-cols-[60%_1fr] md:text-left'>
          <div>
            <h1 className=''>More than just shorter links</h1>
            <p className='mt-2 text-pretty text-xl md:text-balance'>
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
