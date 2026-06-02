import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import {
  fetchLinks,
  createLink,
  updateLink,
  deleteLink,
} from '@/modules/links/_shared/api/providers/provider-links-fetch'
import { FetchError } from '@/modules/_core/api/errors/fetch-error'

describe('provider-links-fetch', () => {
  const signal = new AbortController().signal

  describe('fetchLinks', () => {
    it('returns links on success', async () => {
      const result = await fetchLinks({ signal, payload: { userId: 'user-1' } })

      expect(result).toHaveLength(2)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('originalUrl')
      expect(result[0]).toHaveProperty('shortUrl')
    })

    it('handles 500 error', async () => {
      server.use(
        http.get('*/links', () =>
          HttpResponse.json({ message: 'Server error' }, { status: 500 })
        )
      )

      await expect(
        fetchLinks({ signal, payload: { userId: 'user-1' } })
      ).rejects.toThrow(FetchError)

      await expect(
        fetchLinks({ signal, payload: { userId: 'user-1' } })
      ).rejects.toMatchObject({ status: 500 })
    })

    it('handles network error', async () => {
      server.use(
        http.get('*/links', () => HttpResponse.error())
      )

      await expect(
        fetchLinks({ signal, payload: { userId: 'user-1' } })
      ).rejects.toThrow()
    })
  })

  describe('createLink', () => {
    it('creates a link', async () => {
      const result = await createLink({
        signal,
        payload: { originalUrl: 'https://example.com', userId: 'user-1' },
      })

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('originalUrl', 'https://example.com')
    })
  })

  describe('updateLink', () => {
    it('updates a link', async () => {
      const result = await updateLink({
        signal,
        payload: { id: 'link-1', originalUrl: 'https://updated.com' },
      })

      expect(result).toHaveProperty('id', 'link-1')
      expect(result).toHaveProperty('originalUrl', 'https://updated.com')
    })
  })

  describe('deleteLink', () => {
    it('deletes a link', async () => {
      const result = await deleteLink({
        signal,
        payload: { id: 'link-1' },
      })

      expect(result).toEqual({ success: true })
    })
  })
})
