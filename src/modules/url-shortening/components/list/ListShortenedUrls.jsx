import { useEffect, useState } from 'react'
import { cn } from '@/modules/core/utils/cn'
import { ListShortenedUrlsItem } from '@/modules/url-shortening/components/list/ListShortenedUrlsItem'

export function ListShortenedUrls({ urlList, className, ...props }) {
  const [urlListUpdated, setUrlListUpdated] = useState(urlList)

  useEffect(() => {
    if (!urlList.length) return undefined

    setUrlListUpdated(urlList)
  }, [urlList])

  return (
    <ul className={cn('space-y-5', className)}>
      {urlListUpdated.map(item => (
        <li key={item.urlShortened}>
          <ListShortenedUrlsItem
            url={item.url}
            urlShortened={item.urlShortened}
          />
        </li>
      ))}
    </ul>
  )
}
