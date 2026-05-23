import { } from 'react'
import { cn } from '@/modules/core/utils/cn'
import { ListShortenedUrlsItem } from '@/modules/links/features/shortener/components/ListShortenedUrlsItem'

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

