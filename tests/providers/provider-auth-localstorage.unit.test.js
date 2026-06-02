import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  verifyToken,
  logoutUser,
} from '@/modules/auth/_shared/api/providers/provider-auth-localstorage'

describe('provider-auth-localstorage', () => {
  beforeEach(() => {
    localStorage.setItem(
      'shortly.users',
      JSON.stringify([
        {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'user',
        },
      ])
    )
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('loginUser', () => {
    it('returns user and tokens with valid credentials', async () => {
      const result = await loginUser({
        payload: { email: 'test@example.com', password: 'password123' },
      })

      expect(result).toHaveProperty('user')
      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('refreshToken')
      expect(result.user).not.toHaveProperty('password')
      expect(result.user).toMatchObject({
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      })
    })

    it('throws with wrong password', async () => {
      await expect(
        loginUser({
          payload: { email: 'test@example.com', password: 'wrong' },
        })
      ).rejects.toThrow('Invalid email or password')
    })

    it('throws with non-existent user', async () => {
      await expect(
        loginUser({
          payload: { email: 'unknown@example.com', password: 'password123' },
        })
      ).rejects.toThrow('Invalid email or password')
    })
  })

  describe('registerUser', () => {
    it('registers a new user', async () => {
      const result = await registerUser({
        payload: {
          name: 'New User',
          email: 'new@example.com',
          password: 'newpass123',
          role: 'user',
        },
      })

      expect(result).toHaveProperty('user')
      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('refreshToken')
      expect(result.user).not.toHaveProperty('password')
      expect(result.user).toMatchObject({
        name: 'New User',
        email: 'new@example.com',
        role: 'user',
      })

      const users = JSON.parse(localStorage.getItem('shortly.users'))
      expect(users).toHaveLength(2)
      expect(users[1]).toMatchObject({ email: 'new@example.com' })
    })

    it('throws with duplicate email', async () => {
      await expect(
        registerUser({
          payload: {
            name: 'Duplicate',
            email: 'test@example.com',
            password: 'pass123',
            role: 'user',
          },
        })
      ).rejects.toThrow('Email is already registered')
    })
  })

  describe('verifyToken', () => {
    it('returns user with valid token', async () => {
      const validToken = btoa(
        JSON.stringify({
          userId: 'user-1',
          role: 'user',
          exp: Date.now() + 15000,
        })
      )

      const result = await verifyToken({ payload: { accessToken: validToken } })

      expect(result).toHaveProperty('user')
      expect(result.user).toMatchObject({
        id: 'user-1',
        email: 'test@example.com',
      })
    })

    it('throws with expired token', async () => {
      const expiredToken = btoa(
        JSON.stringify({
          userId: 'user-1',
          role: 'user',
          exp: Date.now() - 10000,
        })
      )

      await expect(
        verifyToken({ payload: { accessToken: expiredToken } })
      ).rejects.toThrow('Invalid or expired token')
    })
  })

  describe('refreshAccessToken', () => {
    it('throws with expired refresh token', async () => {
      const expiredToken = btoa(
        JSON.stringify({ userId: 'user-1', exp: Date.now() - 10000 })
      )

      await expect(
        refreshAccessToken({ payload: { refreshToken: expiredToken } })
      ).rejects.toThrow('Invalid refresh token')
    })
  })

  describe('logoutUser', () => {
    it('returns success', async () => {
      const result = await logoutUser()
      expect(result).toEqual({ success: true })
    })
  })
})
