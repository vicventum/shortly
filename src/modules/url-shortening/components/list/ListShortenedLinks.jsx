import { useEffect, useState } from 'react'
import { cn } from '@/modules/core/utils/cn'
import { ListShortenedLinksItem } from '@/modules/url-shortening/components/list/ListShortenedLinksItem'

export function ListShortenedLinks({
  urlList,
  initLinkData,
  className,
  ...props
}) {
  const [urlListUpdated, setUrlListUpdated] = useState(urlList)

  // Ejecuta el useEffect solo cuando cambie urlShortened
  useEffect(() => {
    if (!urlList.length) return undefined

    setUrlListUpdated(urlList)
  }, [urlList.length])

  return (
    <>
      <ul className={cn('space-y-5', className)}>
        {urlListUpdated.map(item => (
          <li key={item.urlShortened}>
            <ListShortenedLinksItem
              url={item.url}
              urlShortened={item.urlShortened}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
