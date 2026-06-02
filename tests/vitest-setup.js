import '@testing-library/jest-dom/vitest'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

afterEach(() => {
  server.resetHandlers()
  cleanup()
  useSessionStore.setState({ user: null })
  useUrlStore.setState({ urlList: [] })
  localStorage.clear()
  sessionStorage.clear()
})

afterAll(() => server.close())

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
