import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext(null)

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('')
  useEffect(() => {
    const isUserThemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    setTheme(
      document.querySelector('html').getAttribute('data-theme') ??
        (isUserThemeDark ? 'cyberpunk' : 'light')
    )
  }, [])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
  )
}
