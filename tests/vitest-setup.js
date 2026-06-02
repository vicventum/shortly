import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

afterEach(() => {
  cleanup()
  useSessionStore.setState({ user: null })
  useUrlStore.setState({ urlList: [] })
  localStorage.clear()
  sessionStorage.clear()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

process.env.TIME_SCALE_FACTOR = 0
