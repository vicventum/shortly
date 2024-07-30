import { createContext, useState } from 'react'

export const UrlContext = createContext(null)

export function UrlContextProvider({ children }) {
  const [urlList, setUrlList] = useState([])

  function addUrlList(url) {
    setUrlList(prevState => [url, ...prevState])
  }

  const value = {
    urlList,
    addUrlList,
  }

  return <UrlContext.Provider value={value}> {children} </UrlContext.Provider>
}
