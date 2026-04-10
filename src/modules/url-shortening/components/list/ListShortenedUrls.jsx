import { } from 'react'
import { cn } from '@/modules/core/utils/cn'
import { ListShortenedUrlsItem } from '@/modules/url-shortening/components/list/ListShortenedUrlsItem'

export function ListShortenedUrls({ urlList = [], className }) {
  return (
    <ul className={cn('space-y-5', className)}>
      {urlList.map(item => (
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
