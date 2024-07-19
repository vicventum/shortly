import { ListShortenedLinksItem } from '@/modules/url-shortening/components/list/ListShortenedLinksItem'

export function ListShortenedLinks() {
  const linkItems = [
    {
      url: 'https://www.frontendmentor.io',
      urlShortened: 'https://rel.link/k4lKyk',
    },
    {
      url: 'https://twitter.com/frontendmentor',
      urlShortened: 'https://rel.link/s8J4lp',
    },
    {
      url: 'https://vicventum.web.app',
      urlShortened: 'https://rel.link/0CeyIo',
    },
  ]
  return (
    <>
      <ul className='space-y-5'>
        {linkItems.map(item => (
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
