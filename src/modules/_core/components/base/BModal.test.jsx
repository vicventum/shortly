import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { BModal } from './BModal'

afterEach(() => {
  vi.clearAllMocks()
})

describe('BModal', () => {
  function setup() {
    return userEvent.setup()
  }

  describe('when isOpen=true', () => {
    it('renders the dialog with content visible', async () => {
      const { container } = render(
        <BModal
          isOpen={true}
          onClose={vi.fn()}
          content='Are you sure?'
        />,
      )

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('open')
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when isOpen=false', () => {
    it('hides the dialog', () => {
      render(
        <BModal
          isOpen={false}
          onClose={vi.fn()}
          content='Are you sure?'
        />,
      )

      const dialog = screen.getByRole('dialog', { hidden: true })
      expect(dialog).not.toHaveAttribute('open')
    })
  })

  describe('when ESC is pressed', () => {
    it('calls onClose', async () => {
      const onClose = vi.fn()
      const { container } = render(
        <BModal isOpen={true} onClose={onClose} />,
      )

      // happy-dom no implementa el cierre nativo con ESC del <dialog>,
      // así que disparamos el evento 'close' que el componente escucha
      screen.getByRole('dialog').dispatchEvent(new Event('close'))

      expect(onClose).toHaveBeenCalled()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the backdrop close button is clicked', () => {
    it('calls onClose', async () => {
      const onClose = vi.fn()
      const user = setup()
      const { container } = render(
        <BModal isOpen={true} onClose={onClose} />,
      )

      await user.click(screen.getByRole('button', { name: /^close$/i }))

      expect(onClose).toHaveBeenCalled()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the primary action button is clicked', () => {
    it('calls onPrimaryAction', async () => {
      const onPrimaryAction = vi.fn()
      const user = setup()
      const { container } = render(
        <BModal
          isOpen={true}
          onClose={vi.fn()}
          onPrimaryAction={onPrimaryAction}
        />,
      )

      await user.click(screen.getByRole('button', { name: /confirmar/i }))

      expect(onPrimaryAction).toHaveBeenCalled()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the secondary action button is clicked', () => {
    it('calls onSecondaryAction', async () => {
      const onSecondaryAction = vi.fn()
      const user = setup()
      const { container } = render(
        <BModal
          isOpen={true}
          onClose={vi.fn()}
          onSecondaryAction={onSecondaryAction}
        />,
      )

      await user.click(screen.getByRole('button', { name: /cancelar/i }))

      expect(onSecondaryAction).toHaveBeenCalled()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
