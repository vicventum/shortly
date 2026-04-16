import { clientFetchAuth } from '@/modules/core/api/clients/client-fetch-auth'

// const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL

// --- Individual endpoint providers ---

const meUser = async ({ signal, payload } = {}) => {
  return await clientFetchAuth('/auth/me', {
    signal,
    method: 'GET',
  })
}

const loginUser = async ({ signal, payload } = {}) => {
  return await clientFetchAuth('/auth/login', {
    signal,
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const registerUser = async ({ signal, payload } = {}) => {
  return await clientFetchAuth('/auth/register', {
    signal,
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// const verifyToken = async ({ signal } = {}) => {
//   return await clientFetchAuth('/auth/verify', {
//     signal,
//     method: 'POST',
//   })
// }

const refreshAccessToken = async ({ signal, payload } = {}) => {
  return await clientFetchAuth('/auth/refresh', {
    signal,
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const logoutUser = async ({ signal } = {}) => {
  return await clientFetchAuth('/auth/logout', {
    signal,
    method: 'POST',
  })
}

export { loginUser, registerUser, meUser, refreshAccessToken, logoutUser }
