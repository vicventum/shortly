import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
expect.extend({ toHaveNoViolations })

import { register } from '@/modules/auth/_shared/api/services/service-auth'
import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'

import { FormRegister } from './FormRegister'

vi.mock('@/modules/auth/_shared/api/services/service-auth', () => ({
  register: vi.fn(),
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
  register.mockResolvedValue(validUser)
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('FormRegister', () => {
  function setup() {
    return userEvent.setup()
  }

  async function fillAndSubmit(user, { name, email, password, confirm, role } = {}) {
    if (name) await user.type(screen.getByPlaceholderText('Full Name'), name)
    if (email) await user.type(screen.getByPlaceholderText('Email Address'), email)
    if (password) await user.type(screen.getByPlaceholderText('Password'), password)
    if (confirm) await user.type(screen.getByPlaceholderText('Confirm Password'), confirm)
    if (role) await user.selectOptions(screen.getByRole('combobox'), role)
    await user.click(screen.getByRole('button', { name: /sign up/i }))
  }

  describe('when registration is valid', () => {
    it('registers the user and populates the session store', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormRegister />)

      await fillAndSubmit(user, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirm: 'password123',
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

  describe('when passwords do not match', () => {
    it('shows a validation error', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormRegister />)

      await fillAndSubmit(user, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirm: 'differentpassword',
      })

      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the API returns a duplicate email error', () => {
    it('shows an inline error and a toast', async () => {
      const user = setup()
      register.mockRejectedValueOnce(new Error('Email already registered'))

      const { container } = renderWithProviders(<FormRegister />)

      await fillAndSubmit(user, {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
        confirm: 'password123',
      })

      const errorMessages = await screen.findAllByText('Email already registered')
      expect(errorMessages.length).toBeGreaterThanOrEqual(1)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the form is submitted empty', () => {
    it('shows validation errors for required fields', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormRegister />)

      await fillAndSubmit(user)

      expect(screen.getByText('Full Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Min 6 characters')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('when the email is invalid', () => {
    it('shows a validation error for email format', async () => {
      const user = setup()
      const { container } = renderWithProviders(<FormRegister />)

      await fillAndSubmit(user, {
        name: 'Test User',
        email: 'notanemail',
        password: 'password123',
        confirm: 'password123',
      })

      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
