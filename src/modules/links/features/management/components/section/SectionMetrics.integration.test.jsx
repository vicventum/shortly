import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { SectionMetrics } from './SectionMetrics'

afterEach(() => {
  vi.clearAllMocks()
})

describe('SectionMetrics', () => {
  describe('when loading', () => {
    it('shows ellipses for all values', async () => {
      const { container } = renderWithProviders(
        <SectionMetrics data={undefined} isLoading={true} />,
      )

      const ellipses = container.querySelectorAll('.text-3xl')
      expect(ellipses.length).toBe(3)
      ellipses.forEach(el => {
        expect(el.textContent).toBe('...')
      })

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when all metrics are zero', () => {
    it('shows zeros and a None subtitle', async () => {
      const { container } = renderWithProviders(
        <SectionMetrics
          data={{ totalLinks: 0, totalClicks: 0, mostPopular: null }}
          isLoading={false}
        />,
      )

      const zeros = screen.getAllByText('0')
      expect(zeros.length).toBe(2) // totalLinks: 0, totalClicks: 0
      expect(screen.getByText('0 clicks')).toBeInTheDocument()
      expect(screen.getByText('None')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when data is provided', () => {
    it('renders the metrics correctly', async () => {
      const { container } = renderWithProviders(
        <SectionMetrics
          data={{
            totalLinks: 5,
            totalClicks: 42,
            mostPopular: { clicks: 20, shortUrl: 'https://short.ly/pop1' },
          }}
          isLoading={false}
        />,
      )

      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('20 clicks')).toBeInTheDocument()
      expect(screen.getByText('https://short.ly/pop1')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when mostPopular is null', () => {
    it('shows 0 clicks and None subtitle', async () => {
      const { container } = renderWithProviders(
        <SectionMetrics
          data={{
            totalLinks: 1,
            totalClicks: 3,
            mostPopular: null,
          }}
          isLoading={false}
        />,
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('0 clicks')).toBeInTheDocument()
      expect(screen.getByText('None')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
