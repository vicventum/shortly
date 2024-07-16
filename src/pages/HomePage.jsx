import { Hero } from '@/modules/brand/components/Hero'
import { SectionShortenLink } from '@/modules/url-shortering/components/section/SectionShortenLink'

export function HomePage() {
  return (
    <>
      <div className='bg-base-200'>
        <section className='bg-base-100 pb-20'>
          <Hero />
        </section>
        <section className='-mt-20'>
          <SectionShortenLink />
        </section>
      </div>
    </>
  )
}
