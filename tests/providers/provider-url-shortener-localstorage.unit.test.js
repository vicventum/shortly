import { describe, it, expect, afterEach } from 'vitest'
import {
  fetchUrlShortenedList,
  saveUrlShortenedList,
} from '@/modules/links/_shared/api/providers/provider-url-shortener-localstorage'

describe('provider-url-shortener-localstorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  describe('fetchUrlShortenedList', () => {
    it('returns items when list exists', async () => {
      const items = [
        { url: 'https://example.com', urlShortened: 'https://short.ly/abc123' },
        { url: 'https://test.com', urlShortened: 'https://short.ly/def456' },
      ]
      localStorage.setItem('shortly.urlShortenedList', JSON.stringify(items))

      const result = await fetchUrlShortenedList({
        signal: new AbortController().signal,
      })

      expect(result).toEqual(items)
    })

    it('returns empty array when no data', async () => {
      const result = await fetchUrlShortenedList({
        signal: new AbortController().signal,
      })

      expect(result).toEqual([])
    })
  })

  describe('saveUrlShortenedList', () => {
    it('saves items to localStorage', async () => {
      const items = [
        { url: 'https://example.com', urlShortened: 'https://short.ly/abc123' },
      ]

      await saveUrlShortenedList({
        signal: new AbortController().signal,
        payload: { urlList: items },
      })

      const stored = JSON.parse(
        localStorage.getItem('shortly.urlShortenedList')
      )
      expect(stored).toEqual(items)

      const result = await fetchUrlShortenedList({
        signal: new AbortController().signal,
      })
      expect(result).toEqual(items)
    })
  })
})
