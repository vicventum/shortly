import { SectionHero } from '@/modules/brand/components/section/SectionHero'
import { SectionShortenLink } from '@/modules/url-shortering/components/section/SectionShortenLink'
import { SectionFeatures } from '@/modules/brand/components/section/SectionFeatures'
import { BannerCta } from '@/modules/brand/components/banner/BannerCta'

export function HomePage() {
  return (
    <>
      <div className='bg-base-200'>
        <section className='bg-base-100 pb-20'>
          <SectionHero />
        </section>
        <section className='-mt-20'>
          <SectionShortenLink />
        </section>
        <section className='py-32'>
          <SectionFeatures className='' />
        </section>
        <section>
          <BannerCta />
        </section>
      </div>
    </>
  )
}
