import { SectionHero } from '@/modules/brand/features/marketing/components/section/SectionHero'
import { SectionShortenUrl } from '@/modules/links/features/shortener/components/section/SectionShortenUrl'
import { SectionFeatures } from '@/modules/brand/features/marketing/components/section/SectionFeatures'
import { BannerCta } from '@/modules/brand/features/marketing/components/banner/BannerCta'

export function HomePage() {
  return (
    <>
      <title>Shortly â€” Shorten Your Links</title>
      <meta name="description" content="Shorten your links quickly and securely." />
      <div className='bg-base-200'>
        <section className='bg-base-100 pb-40 md:pb-20'>
          <SectionHero />
        </section>
        <section className='-mt-20'>
          <SectionShortenUrl />
        </section>
        <section className='py-24 md:py-32'>
          <SectionFeatures />
        </section>
        <section>
          <BannerCta />
        </section>
      </div>
    </>
  )
}


