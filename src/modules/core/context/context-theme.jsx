import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext(null)

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('')
  useEffect(() => {
    setTheme(document.querySelector('html').getAttribute('data-theme'))
  }, [])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
  )
}
