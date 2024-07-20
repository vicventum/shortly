import { useEffect, useState, useRef } from 'react'
import { cn } from '@/modules/core/utils/cn'
import { ListShortenedLinksItem } from '@/modules/url-shortening/components/list/ListShortenedLinksItem'

export function ListShortenedLinks({ linkData, className, ...props }) {
  console.log('🚀 ~ ListShortenedLinks ~ linkData:', linkData)
  const [linkList, setLinkList] = useState([])

  const { url, urlShortened } = linkData
  // ? Usa una referencia para almacenar ultimo valor de variable y no pasarla como dependencia del `useEffect`
  const urlRef = useRef(url)

  // Actualiza la referencia cuando cambie el valor de url
  useEffect(() => {
    urlRef.current = url
  }, [url])

  // Ejecuta el useEffect solo cuando cambie urlShortened
  useEffect(() => {
    if (!urlShortened) return undefined

    setLinkList(currentLinkList => {
      return [
        {
          url: urlRef.current, // Usa la referencia de url
          urlShortened,
        },
        ...currentLinkList,
      ]
    })
  }, [urlShortened])

  // useEffect(() => {
  //   if (!urlShortened) return undefined
  //   setLinkList(currentLinkList => {
  //     console.log('🚀 ~ useEffect ~ currentLinkList:', currentLinkList)
  //     return [
  //       ...currentLinkList,
  //       {
  //         url,
  //         urlShortened,
  //       },
  //     ]
  //   })
  // }, [urlShortened])

  return (
    <>
      <ul className={cn('space-y-5', className)}>
        {linkList.map(item => (
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
