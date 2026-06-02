import { http, HttpResponse } from 'msw'
import { generateLinkList } from 'tests/factories/link'

const BASE = 'http://localhost:3000'

export const handlers = [
  // GET /links?userId=xxx&_sort=createdAt&_order=desc
  http.get(`${BASE}/links`, ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    return HttpResponse.json(generateLinkList(2))
  }),

  // POST /links
  http.post(`${BASE}/links`, async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: crypto.randomUUID(), ...body }, { status: 201 })
  }),

  // PATCH /links/:id
  http.patch(`${BASE}/links/:id`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json({ id: params.id, ...body })
  }),

  // DELETE /links/:id
  http.delete(`${BASE}/links/:id`, ({ params }) => {
    return HttpResponse.json({ success: true })
  }),
]
