import { clientFetchAuth } from '@/modules/core/api/clients/client-fetch-auth'

const updateProfile = async ({ signal, payload } = {}) => {
  const { id, ...data } = payload
  return await clientFetchAuth(`/users/${id}`, {
    signal,
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export { updateProfile }
