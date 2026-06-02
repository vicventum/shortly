import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { shortUrl } from '@/modules/links/_shared/api/services/service-url-shortener'
import { updateLink } from '@/modules/links/_shared/api/services/service-links'
import { generateLink, generateLinkList } from 'tests/factories/link'

import { SectionLinksTimeline } from './SectionLinksTimeline'

vi.mock('@/modules/links/_shared/api/services/service-url-shortener', () => ({
  shortUrl: vi.fn(),
}))

vi.mock('@/modules/links/_shared/api/services/service-links', () => ({
  updateLink: vi.fn(),
  getLinks: vi.fn(),
  getLinkStats: vi.fn(),
}))

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  })
  updateLink.mockResolvedValue(undefined)
  shortUrl.mockResolvedValue('https://short.ly/edited123')
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('SectionLinksTimeline', () => {
  function setup() {
    return userEvent.setup()
  }

  describe('when loading', () => {
    it('shows a spinner', async () => {
      const { container } = renderWithProviders(
        <SectionLinksTimeline
          links={undefined}
          isLoading={true}
          onRefresh={vi.fn()}
        />,
      )

      // Loading state renders a centered container with a spinner
      expect(
        screen.queryByText("You don't have any saved links yet."),
      ).not.toBeInTheDocument()
      expect(container.querySelector('.justify-center')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when there are no links', () => {
    it('shows an empty state message', async () => {
      const { container } = renderWithProviders(
        <SectionLinksTimeline links={[]} isLoading={false} onRefresh={vi.fn()} />,
      )

      expect(
        screen.getByText("You don't have any saved links yet."),
      ).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when links are provided', () => {
    it('renders the link data correctly', async () => {
      const links = generateLinkList(2)
      const { container } = renderWithProviders(
        <SectionLinksTimeline
          links={links}
          isLoading={false}
          onRefresh={vi.fn()}
        />,
      )

      expect(screen.getByText(links[0].originalUrl)).toBeInTheDocument()
      expect(screen.getByText(links[0].shortUrl)).toBeInTheDocument()
      expect(screen.getByText(links[1].originalUrl)).toBeInTheDocument()
      expect(screen.getByText(links[1].shortUrl)).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the copy button is clicked', () => {
    it('copies the short URL and updates click count', async () => {
      const user = setup()
      const onRefresh = vi.fn()
      const link = generateLink({ clicks: 5 })
      const { container } = renderWithProviders(
        <SectionLinksTimeline
          links={[link]}
          isLoading={false}
          onRefresh={onRefresh}
        />,
      )

      await user.click(screen.getByRole('button', { name: /copy/i }))

      // Verify the copy feedback appears
      expect(await screen.findByText('Copied!')).toBeInTheDocument()
      // updateLink is called as (provider, { signal, payload }) by useUpdateLink
      expect(updateLink).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          payload: expect.objectContaining({ id: link.id, clicks: 6 }),
        }),
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the edit flow is completed', () => {
    it('saves the edited URL', async () => {
      const user = setup()
      const onRefresh = vi.fn()
      const link = generateLink({
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/abc',
      })
      const { container } = renderWithProviders(
        <SectionLinksTimeline
          links={[link]}
          isLoading={false}
          onRefresh={onRefresh}
        />,
      )

      await user.click(screen.getByRole('button', { name: /edit/i }))

      const editInput = screen.getByDisplayValue(link.originalUrl)
      await user.clear(editInput)
      await user.type(editInput, 'https://edited.com')

      await user.click(screen.getByRole('button', { name: /save/i }))

      await waitFor(() => {
        expect(shortUrl).toHaveBeenCalled()
      })

      // updateLink is called as (provider, { signal, payload }) by useUpdateLink
      expect(updateLink).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          payload: expect.objectContaining({
            id: link.id,
            originalUrl: 'https://edited.com',
            shortUrl: 'https://short.ly/edited123',
          }),
        }),
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when edit is cancelled', () => {
    it('restores the original URL', async () => {
      const user = setup()
      const onRefresh = vi.fn()
      const link = generateLink({
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/abc',
      })
      const { container } = renderWithProviders(
        <SectionLinksTimeline
          links={[link]}
          isLoading={false}
          onRefresh={onRefresh}
        />,
      )

      await user.click(screen.getByRole('button', { name: /edit/i }))

      expect(screen.getByDisplayValue(link.originalUrl)).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /cancel/i }))

      expect(screen.getByText(link.originalUrl)).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
