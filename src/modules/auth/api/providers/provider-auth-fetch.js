import { clientFetchAuth } from '@/modules/core/api/clients/client-fetch-auth'

// const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL

// --- Individual endpoint providers ---

const loginUser = async ({ signal, payload } = {}) => {
  const bodyContent = JSON.stringify(payload)

  const resp = await clientFetchAuth('/api/auth/login', {
    signal,
    method: 'POST',
    body: bodyContent,
  })
  if (!resp.ok) throw new Error('Invalid email or password')
  const data = await resp.json()
  return data
}

const registerUser = async ({ signal, payload } = {}) => {
  const bodyContent = JSON.stringify(payload)

  const resp = await clientFetchAuth('/api/auth/register', {
    signal,
    method: 'POST',
    body: bodyContent,
  })
  if (!resp.ok) throw new Error('Registration failed')
  const data = await resp.json()
  return data
}

const verifyToken = async ({ signal } = {}) => {
  // clientFetchAuth se encarga de inyectar el token automáticamente
  const resp = await clientFetchAuth('/api/auth/verify', {
    signal,
    method: 'POST',
  })
  if (!resp.ok) throw new Error('Invalid or expired token')
  const data = await resp.json()
  return data
}

const refreshAccessToken = async ({ signal, payload } = {}) => {
  const bodyContent = JSON.stringify(payload)

  const resp = await clientFetchAuth('/api/auth/refresh', {
    signal,
    method: 'POST',
    body: bodyContent,
  })
  if (!resp.ok) throw new Error('Failed to refresh token')
  const data = await resp.json()
  return data
}

const logoutUser = async ({ signal } = {}) => {
  const resp = await clientFetchAuth('/api/auth/logout', {
    signal,
    method: 'POST',
  })
  if (!resp.ok) throw new Error('Logout failed')
  const data = await resp.json()
  return data
}

export { loginUser, registerUser, verifyToken, refreshAccessToken, logoutUser }
