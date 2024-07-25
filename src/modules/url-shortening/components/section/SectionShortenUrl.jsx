import { useEffect, useRef } from 'react'
import { FormUrl } from '@/modules/url-shortening/components/form/FormUrl'
import { ListShortenedUrls } from '@/modules/url-shortening/components/list/ListShortenedUrls'
import { cn } from '@/modules/core/utils/cn'
import { useShortUrl } from '@/modules/url-shortening/api/hooks/use-short-url'
import { useGetUrlList } from '@/modules/url-shortening/api/hooks/use-get-url-list'
import { useSaveUrlList } from '@/modules/url-shortening/api/hooks/use-save-url-list'

export function SectionShortenUrl() {
  const { data: urlList, refresh } = useGetUrlList()
  const { data: urlShortened, isLoading, sendNewUrl } = useShortUrl()
  const { data: savedList, saveUrlList } = useSaveUrlList()

  const urlRef = useRef('')

  async function handleSubmit({ value }) {
    urlRef.current = value
    sendNewUrl(value)
  }

  useEffect(() => {
    if (!urlShortened) return undefined
    const urlData = {
      url: urlRef.current,
      urlShortened,
    }
    const listUpdated = [urlData, ...urlList]
    saveUrlList(listUpdated)
  }, [urlShortened])

  useEffect(() => {
    refresh()
  }, [savedList])

  return (
    <>
      <div className='container space-y-5'>
        <FormUrl isLoading={isLoading} onSubmitUrl={handleSubmit} />
        <ListShortenedUrls
          className={cn({ hidden: !urlList?.length })}
          urlList={urlList}
        />
      </div>
    </>
  )
}
