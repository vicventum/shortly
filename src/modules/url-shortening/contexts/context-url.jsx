import { createContext } from 'react'
import useLocalStorage from '@/modules/core/hooks/use-local-storage'

export const UrlContext = createContext(null)

export function UrlContextProvider({ children }) {
	// const [urlList, setUrlList] = useState(() => {
  //    try {
  //      const data = window.localStorage.getItem('shortly.urlShortenedList')
  //      return data ? JSON.parse(data) : []
  //    } catch (error) {
  //      console.error('Error parsing localStorage item:', error)
  //      return []
  //    }
  //  })
  const [urlList, setUrlList] = useLocalStorage('shortly.urlShortenedList', [])

  function addUrlList(url) {
    setUrlList(prevState => [url, ...prevState])
  }

  const value = {
    urlList,
    addUrlList,
  }

  return <UrlContext.Provider value={value}> {children} </UrlContext.Provider>
}
