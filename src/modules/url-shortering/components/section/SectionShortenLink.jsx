import { FormUrl } from '@/modules/url-shortering/components/form/FormUrl'
import { ListShortenedLinks } from '@/modules/url-shortering/components/list/ListShortenedLinks'

export function SectionShortenLink() {
  return (
    <>
      <div className='container space-y-5'>
        <FormUrl />
        <ListShortenedLinks />
      </div>
    </>
  )
}