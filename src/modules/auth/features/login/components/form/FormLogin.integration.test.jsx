import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { login } from '@/modules/auth/_shared/api/services/service-auth'
import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'

import { FormLogin } from './FormLogin'

vi.mock('@/modules/auth/_shared/api/services/service-auth', () => ({
  login: vi.fn(),
}))

const validUser = {
  user: {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
  },
  accessToken: 'access-token-123',
  refreshToken: 'refresh-token-123',
}

beforeEach(() => {
  login.mockResolvedValue(validUser)
})

describe('FormLogin', () => {
  function setup() {
    return userEvent.setup()
  }

  async function fillAndSubmit(user, { email, password }) {
    if (email) {
      await user.type(screen.getByPlaceholderText('Email Address'), email)
    }
    if (password) {
      await user.type(screen.getByPlaceholderText('Password'), password)
    }
    await user.click(screen.getByRole('button', { name: /login/i }))
  }

  describe('when credentials are valid', () => {
    it('logs in and populates the session store', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormLogin />)

      await fillAndSubmit(user, {
        email: 'test@example.com',
        password: 'password123',
      })

      await waitFor(() => {
        expect(useSessionStore.getState().user).toEqual(
          expect.objectContaining({
            email: 'test@example.com',
          }),
        )
      })

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when credentials are wrong', () => {
    it('shows an error alert', async () => {
      const user = setup()
      login.mockRejectedValueOnce(new Error('Invalid email or password'))

      const { container } = renderWithProviders(<FormLogin />)

      await fillAndSubmit(user, {
        email: 'wrong@example.com',
        password: 'wrongpass',
      })

      const errorMessages = await screen.findAllByText(
        'Invalid email or password',
      )
      expect(errorMessages.length).toBeGreaterThanOrEqual(1)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the email is empty', () => {
    it('shows a validation error for email', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormLogin />)

      await fillAndSubmit(user, {
        password: 'password123',
      })

      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the password is empty', () => {
    it('shows a validation error for password', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormLogin />)

      await fillAndSubmit(user, {
        email: 'test@example.com',
      })

      expect(screen.getByText('Min 6 characters')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the form is submitting', () => {
    it('disables the submit button', async () => {
      const user = setup()
      login.mockReturnValue(new Promise(() => {})) // Never resolves

      renderWithProviders(<FormLogin />)

      await fillAndSubmit(user, {
        email: 'test@example.com',
        password: 'password123',
      })

      expect(
        screen.getByRole('button', { name: /login/i }),
      ).toBeDisabled()
    })
  })
})
