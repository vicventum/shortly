import { useEffect, useState, useRef } from 'react'
import { ListShortenedLinksItem } from '@/modules/url-shortening/components/list/ListShortenedLinksItem'

export function ListShortenedLinks({ linkData }) {
  const [linkList, setLinkList] = useState([
    {
      url: 'https://www.frontendmentor.io',
      urlShortened: 'https://rel.link/k4lKyk',
    },
  ])

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
      console.log('🚀 ~ useEffect ~ currentLinkList:', currentLinkList)
      return [
        ...currentLinkList,
        {
          url: urlRef.current, // Usa la referencia de url
          urlShortened,
        },
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
      <ul className='space-y-5'>
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
