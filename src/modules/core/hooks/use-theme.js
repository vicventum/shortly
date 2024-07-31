import { useState } from 'react'
import { useAttributeObserver } from './use-attribute-observer'

export function useTheme() {
  const [theme, setTheme] = useState('')

  const handleAttributeChange = newValue => {
    setTheme(newValue)
  }

  useAttributeObserver('html', 'data-theme', handleAttributeChange)

  return [theme]
}
