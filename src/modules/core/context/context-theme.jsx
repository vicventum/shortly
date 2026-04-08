import { createContext, useState, useEffect } from 'react'
import { themeChange } from 'theme-change'

export const ThemeContext = createContext(null)

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    // Inicializar theme-change
    themeChange(false)

    // Obtener el tema actual
    const isUserThemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    setTheme(
      document.querySelector('html').getAttribute('data-theme') ??
        (isUserThemeDark ? 'cobalt' : 'light')
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
