import { clientFetchAuth } from '@/modules/core/api/clients/client-fetch-auth'

const fetchLinks = async ({ signal, payload } = {}) => {
  const { userId } = payload
  return await clientFetchAuth(`/links?userId=${userId}&_sort=createdAt&_order=desc`, {
    signal,
    method: 'GET',
  })
}

const fetchLinkStats = async ({ signal } = {}) => {
  return await clientFetchAuth('/links/stats', {
    signal,
    method: 'GET',
  })
}

const createLink = async ({ signal, payload } = {}) => {
  return await clientFetchAuth('/links', {
    signal,
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const updateLink = async ({ signal, payload } = {}) => {
  const { id, ...data } = payload
  return await clientFetchAuth(`/links/${id}`, {
    signal,
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

const deleteLink = async ({ signal, payload } = {}) => {
  const { id } = payload
  return await clientFetchAuth(`/links/${id}`, {
    signal,
    method: 'DELETE',
  })
}

export { fetchLinks, fetchLinkStats, createLink, updateLink, deleteLink }
