import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import {
  shortUrl,
  getUrlShortenedList,
  setUrlShortenedList,
} from '@/modules/links/_shared/api/services/service-url-shortener'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

import { SectionShortenUrl } from './SectionShortenUrl'

vi.mock('@/modules/links/_shared/api/services/service-url-shortener', () => ({
  shortUrl: vi.fn(),
  getUrlShortenedList: vi.fn(),
  setUrlShortenedList: vi.fn(),
}))

// Mock clipboard API (happy-dom has clipboard as read-only getter)
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
  configurable: true,
})

beforeEach(() => {
  getUrlShortenedList.mockImplementation(() =>
    Promise.resolve(useUrlStore.getState().urlList),
  )
  shortUrl.mockResolvedValue('https://short.ly/abc123')
  setUrlShortenedList.mockResolvedValue(undefined)
})

describe('SectionShortenUrl', () => {
  function setup() {
    return userEvent.setup()
  }

  describe('when user submits a valid URL', () => {
    it('shortens the URL and displays it in the list', async () => {
      const user = setup()
      const { container } = renderWithProviders(<SectionShortenUrl />)

      await user.type(
        screen.getByPlaceholderText('Shorten a link here...'),
        'https://example.com',
      )
      await user.click(screen.getByRole('button', { name: /shorten/i }))

      expect(await screen.findByText('https://short.ly/abc123')).toBeVisible()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('and the URL is already shortened', () => {
    it('does not create a duplicate in the list', async () => {
      const user = setup()
      useUrlStore.setState({
        urlList: [
          {
            url: 'https://example.com',
            urlShortened: 'https://short.ly/abc123',
          },
        ],
      })

      renderWithProviders(<SectionShortenUrl />)

      await user.type(
        screen.getByPlaceholderText('Shorten a link here...'),
        'https://example.com',
      )
      await user.click(screen.getByRole('button', { name: /shorten/i }))

      // Wait for list to render from initial fetch
      expect(
        await screen.findByText('https://short.ly/abc123'),
      ).toBeInTheDocument()

      // The list should only contain one item
      expect(screen.getAllByRole('listitem')).toHaveLength(1)
    })
  })

  describe('and the shortening API fails', () => {
    it('does not crash the component', async () => {
      const user = setup()
      shortUrl.mockRejectedValue(new Error('API Error'))

      const { container } = renderWithProviders(<SectionShortenUrl />)

      await user.type(
        screen.getByPlaceholderText('Shorten a link here...'),
        'https://example.com',
      )
      await user.click(screen.getByRole('button', { name: /shorten/i }))

      // Component should still be intact after error
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Shorten a link here...'),
        ).toBeInTheDocument()
      })
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the form is loading', () => {
    it('disables the submit button', async () => {
      const user = setup()
      shortUrl.mockReturnValue(new Promise(() => {})) // Never resolves

      renderWithProviders(<SectionShortenUrl />)

      await user.type(
        screen.getByPlaceholderText('Shorten a link here...'),
        'https://example.com',
      )
      await user.click(screen.getByRole('button', { name: /shorten/i }))

      expect(
        screen.getByRole('button', { name: /shorten/i }),
      ).toBeDisabled()
    })
  })

  describe('when no URLs are shortened yet', () => {
    it('renders without list items', async () => {
      const { container } = renderWithProviders(<SectionShortenUrl />)

      await waitFor(() => {
        expect(
          screen.queryByRole('listitem'),
        ).not.toBeInTheDocument()
      })

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
