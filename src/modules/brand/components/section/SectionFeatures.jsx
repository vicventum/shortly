import { CardFeature } from '@/modules/brand/components/card/CardFeature'
import { DATA_FEATURES } from '@/modules/core/constants'

export function SectionFeatures() {
  const classTopSpacingCards = ['mt-0', 'mt-12', 'mt-24']

  return (
    <>
      <div className='container'>
        <div className='mx-auto w-1/2 text-center'>
          <h2>Advanced Statistics</h2>
          <p className='mt-6 leading-7'>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>

        <div className='relative mt-32 grid grid-cols-3 items-start gap-8'>
          <div className='absolute top-[45%] h-2 w-full bg-primary' />

          {DATA_FEATURES.map((feature, index) => (
            <CardFeature
              key={feature.title}
              className={classTopSpacingCards[index]}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
          {/* <CardFeature className='mt-12' icon={IconBrandRecognition} />
          <CardFeature className='mt-24' icon={IconBrandRecognition} /> */}
        </div>
      </div>
    </>
  )
}
