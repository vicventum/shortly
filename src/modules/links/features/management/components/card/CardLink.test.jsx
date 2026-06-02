import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { generateLink } from 'tests/factories/link'
import { CardLink } from './CardLink'

afterEach(() => {
  vi.clearAllMocks()
})

describe('CardLink', () => {
  function setup() {
    return userEvent.setup()
  }

  describe('when rendering link data', () => {
    it('displays original URL, short URL, clicks count, and status badge', async () => {
      const link = generateLink({ status: 'popular' })
      const { container } = render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={false}
          isEditing={false}
          editedUrlValue={''}
          isSaving={false}
          onCopy={vi.fn()}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      expect(screen.getByText(link.originalUrl)).toBeInTheDocument()
      expect(screen.getByText(link.shortUrl)).toBeInTheDocument()
      expect(screen.getByText(`${link.clicks} clicks`)).toBeInTheDocument()
      expect(screen.getByText(link.status)).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when edit mode is active', () => {
    it('shows the edit input and Save/Cancel buttons', async () => {
      const link = generateLink()
      const { container } = render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={false}
          isEditing={true}
          editedUrlValue={link.originalUrl}
          isSaving={false}
          onCopy={vi.fn()}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      expect(screen.getByDisplayValue(link.originalUrl)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the Copy button is clicked', () => {
    it('calls onCopy', async () => {
      const onCopy = vi.fn()
      const link = generateLink()
      const user = setup()
      render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={false}
          isEditing={false}
          editedUrlValue={''}
          isSaving={false}
          onCopy={onCopy}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      await user.click(screen.getByRole('button', { name: 'Copy' }))

      expect(onCopy).toHaveBeenCalled()
    })
  })

  describe('when isCopy is true', () => {
    it('shows "Copied!" on the button', async () => {
      const link = generateLink()
      const { container } = render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={true}
          isEditing={false}
          editedUrlValue={''}
          isSaving={false}
          onCopy={vi.fn()}
          onDelete={vi.fn()}
          onEdit={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the Edit button is clicked', () => {
    it('calls onEdit', async () => {
      const onEdit = vi.fn()
      const link = generateLink()
      const user = setup()
      render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={false}
          isEditing={false}
          editedUrlValue={''}
          isSaving={false}
          onCopy={vi.fn()}
          onDelete={vi.fn()}
          onEdit={onEdit}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      await user.click(screen.getByRole('button', { name: /edit/i }))

      expect(onEdit).toHaveBeenCalled()
    })
  })

  describe('when the Delete button is clicked', () => {
    it('calls onDelete', async () => {
      const onDelete = vi.fn()
      const link = generateLink()
      const user = setup()
      render(
        <CardLink
          originalUrl={link.originalUrl}
          shortUrl={link.shortUrl}
          createdAt={link.createdAt}
          clicks={link.clicks}
          status={link.status}
          isCopy={false}
          isEditing={false}
          editedUrlValue={''}
          isSaving={false}
          onCopy={vi.fn()}
          onDelete={onDelete}
          onEdit={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          onEditedUrlChange={vi.fn()}
        />,
      )

      await user.click(screen.getByRole('button', { name: /delete/i }))

      expect(onDelete).toHaveBeenCalled()
    })
  })
})
