import { createAuthClient } from '@/modules/auth/api/clients/client-auth-fetch'

// const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL

// Inyectamos la lógica de almacenamiento específica para esta implementación
const clientAuthFetch = createAuthClient({
  getToken: () => window.localStorage.getItem('shortly.accessToken'),
  getRefreshToken: () => window.localStorage.getItem('shortly.refreshToken'),
  onTokensRefreshed: (token, refreshToken) => {
    window.localStorage.setItem('shortly.accessToken', token)
    if (refreshToken) {
      window.localStorage.setItem('shortly.refreshToken', refreshToken)
    }
  },
  onRefreshFailed: () => {
    window.localStorage.removeItem('shortly.accessToken')
    window.localStorage.removeItem('shortly.refreshToken')
  }
})

// --- Individual endpoint providers ---

const loginUser = async ({ signal, payload } = {}) => {
  const bodyContent = JSON.stringify(payload)

  const resp = await clientAuthFetch('/api/auth/login', {
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

  const resp = await clientAuthFetch('/api/auth/register', {
    signal,
    method: 'POST',
    body: bodyContent,
  })
  if (!resp.ok) throw new Error('Registration failed')
  const data = await resp.json()
  return data
}

const verifyToken = async ({ signal } = {}) => {
  // clientAuthFetch se encarga de inyectar el token automáticamente
  const resp = await clientAuthFetch('/api/auth/verify', {
    signal,
    method: 'POST',
  })
  if (!resp.ok) throw new Error('Invalid or expired token')
  const data = await resp.json()
  return data
}

const refreshAccessToken = async ({ signal, payload } = {}) => {
  const bodyContent = JSON.stringify(payload)

  const resp = await clientAuthFetch('/api/auth/refresh', {
    signal,
    method: 'POST',
    body: bodyContent,
  })
  if (!resp.ok) throw new Error('Failed to refresh token')
  const data = await resp.json()
  return data
}

const logoutUser = async ({ signal } = {}) => {
  const resp = await clientAuthFetch('/api/auth/logout', {
    signal,
    method: 'POST',
  })
  if (!resp.ok) throw new Error('Logout failed')
  const data = await resp.json()
  return data
}

export { loginUser, registerUser, verifyToken, refreshAccessToken, logoutUser }
