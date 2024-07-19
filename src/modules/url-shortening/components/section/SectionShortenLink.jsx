import { useState } from 'react'
import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedLinks } from '@/modules/url-shortening/components/list/ListShortenedLinks'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'

export function SectionShortenLink() {
  const [url, setUrl] = useState('')
  const { data: urlShortened, setNewUrl } = useShortUrl()
  function handleSubmit({ value }) {
    console.log('🚀 ~ handleSubmit ~ value:', value)
    setNewUrl(value)
    setUrl(value)
  }

  return (
    <>
      <div className='container space-y-5'>
        <FormUrl onSubmitUrl={handleSubmit} />
        <ListShortenedLinks
          linkData={{
            url,
            urlShortened,
          }}
        />
      </div>
    </>
  )
}
