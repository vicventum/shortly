import { useEffect, useRef } from 'react'
import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedLinks } from '@/modules/url-shortening/components/list/ListShortenedLinks'
import { cn } from '@/modules/core/utils/cn'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { useGetUrlList } from '@/modules/url-shortening/api/hooks/use-get-url-list'
import { useSaveUrlList } from '@/modules/url-shortening/api/hooks/use-save-url-list'

export function SectionShortenLink() {
  const { data: urlList, refresh } = useGetUrlList()
  const { data: urlShortened, isLoading, setNewUrl } = useShortUrl()
  const { data: savedList, setUrlList } = useSaveUrlList()

  const urlRef = useRef('')

  async function handleSubmit({ value }) {
    urlRef.current = value
    setNewUrl(value)
  }

  useEffect(() => {
    if (!urlShortened) return undefined
    const linkData = {
      url: urlRef.current,
      urlShortened,
    }
    const listUpdated = [linkData, ...urlList]
    setUrlList(listUpdated)
  }, [urlShortened])

  useEffect(() => {
    refresh()
  }, [savedList])

  return (
    <>
      <div className='container space-y-5'>
        <FormUrl isLoading={isLoading} onSubmitUrl={handleSubmit} />
        <ListShortenedLinks
          className={cn({ hidden: !urlList?.length })}
          initLinkData={urlList}
          urlList={urlList}
        />
      </div>
    </>
  )
}
