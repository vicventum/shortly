import { useState, useEffect, useRef } from 'react'
import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedLinks } from '@/modules/url-shortening/components/list/ListShortenedLinks'
import { cn } from '@/modules/core/utils/cn'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { useGetUrlList } from '../../api/hooks/use-get-url-list'
import { useSaveUrlList } from '../../api/hooks/use-save-url-list'

export function SectionShortenLink() {
  const { data: urlList } = useGetUrlList()
  const { data: urlShortened, isLoading, setNewUrl } = useShortUrl()
  const { setUrlList } = useSaveUrlList()
  // console.log('🚀 ~ Component SectionShortenLink ~ urlList:', urlList)

  const urlRef = useRef('')

  async function handleSubmit({ value }) {
    urlRef.current = value
    setNewUrl(value)
  }

  const [urlShortenedUpdated, setUrlShortenedUpdated] = useState(urlList)
  useEffect(() => {
    setUrlShortenedUpdated(urlList)
  }, [urlList])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ urlShortened:', urlShortened)
    if (!urlShortened) return undefined
    const linkData = {
      url: urlRef.current,
      urlShortened,
    }
    const listUpdated = [linkData, ...urlShortenedUpdated]
    setUrlList(listUpdated)
    setUrlShortenedUpdated(listUpdated)
    // refresh()
  }, [urlShortened])

  return (
    <>
      <div className='container space-y-5'>
        <FormUrl isLoading={isLoading} onSubmitUrl={handleSubmit} />
        <ListShortenedLinks
          className={cn({ hidden: !urlShortenedUpdated?.length })}
          initLinkData={urlShortenedUpdated}
          urlList={urlShortenedUpdated}
        />
      </div>
    </>
  )
}
