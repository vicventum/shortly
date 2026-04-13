import { clientFetch } from '@/modules/core/api/clients/client-fetch'

/**
 * Factory para crear un cliente HTTP genérico con intercepción JWT.
 * 
 * @param {Object} config - Configuración de inyección de dependencias
 * @param {string} config.refreshEndpoint - Ruta para refrescar el token (ej: '/api/auth/refresh')
 * @param {Function} config.getToken - Retorna el access token actual
 * @param {Function} config.getRefreshToken - Retorna el refresh token actual
 * @param {Function} config.onTokensRefreshed - Callback cuando se obtienen nuevos tokens
 * @param {Function} config.onRefreshFailed - Callback cuando el refresh falla
 */
const createAuthClient = ({
  refreshEndpoint,
  getToken,
  getRefreshToken,
  onTokensRefreshed,
  onRefreshFailed,
}) => {
  return async (url, options = {}) => {
    let token = getToken()
    
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      ...options.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    let response = await clientFetch(url, { ...options, headers })

    if (response.status === 401 && !options._retry) {
      const refreshToken = getRefreshToken()
      
      if (refreshToken) {
        try {
          const refreshResponse = await clientFetch(refreshEndpoint, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ refreshToken })
          })

          if (refreshResponse.ok) {
            const data = await refreshResponse.json()
            token = data.accessToken
            onTokensRefreshed(data.accessToken, data.refreshToken)

            headers.Authorization = `Bearer ${token}`
            response = await clientFetch(url, { 
              ...options, 
              headers, 
              _retry: true 
            })
          } else {
            onRefreshFailed()
          }
        } catch (err) {
          console.error('Error auto-refreshing token:', err)
          onRefreshFailed()
        }
      } else {
        onRefreshFailed()
      }
    }

    return response
  }
}

export { createAuthClient }
