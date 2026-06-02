import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, act } from 'tests/test-utils'
import { fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { ListShortenedUrlsItem } from './ListShortenedUrlsItem'

afterEach(() => {
  vi.clearAllMocks()
})

describe('ListShortenedUrlsItem', () => {
  describe('when rendering both URLs', () => {
    it('displays the original URL, shortened URL, and Copy button', async () => {
      const { container } = render(
        <ListShortenedUrlsItem
          url='https://example.com'
          urlShortened='https://short.ly/abc'
        />,
      )

      expect(screen.getByText('https://example.com')).toBeInTheDocument()
      expect(screen.getByText('https://short.ly/abc')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the Copy button is clicked', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      })
    })

    it('reverts the button text after the timeout', async () => {
      vi.useFakeTimers()
      const { container } = render(
        <ListShortenedUrlsItem
          url='https://example.com'
          urlShortened='https://short.ly/abc'
        />,
      )

      // fireEvent.click es síncrono — no necesita timers como userEvent
      fireEvent.click(screen.getByRole('button', { name: /copy/i }))

      // advanceTimersByTimeAsync flushea microtasks (clipboard.writeText)
      // + React re-renders, sin necesidad de waitFor
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0)
      })

      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument()

      // Avanzar 1500ms para que el setTimeout del useEffect se dispare
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1500)
      })

      expect(screen.getByRole('button', { name: /^copy$/i })).toBeInTheDocument()

      vi.useRealTimers()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
