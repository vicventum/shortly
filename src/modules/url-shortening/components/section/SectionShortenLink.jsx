import { useState } from 'react'
import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedLinks } from '@/modules/url-shortening/components/list/ListShortenedLinks'
import { cn } from '@/modules/core/utils/cn'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'

export function SectionShortenLink() {
  const [url, setUrl] = useState('')
  const { data: urlShortened, isLoading, setNewUrl } = useShortUrl()
  function handleSubmit({ value }) {
    setNewUrl(value)
    setUrl(value)
  }

  const linkData = {
    url,
    urlShortened,
  }

  return (
    <>
      <div className='container space-y-5'>
        <FormUrl isLoading={isLoading} onSubmitUrl={handleSubmit} />
        <ListShortenedLinks
          className={cn({ hidden: !urlShortened })}
          linkData={linkData}
        />
      </div>
    </>
  )
}
