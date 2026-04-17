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

    let data
    try {
      data = await clientFetch(url, { ...options, headers })
    } catch (error) {
      if (error.status === 401 && !options._retry) {
        const refreshToken = getRefreshToken()
        
        if (refreshToken) {
          try {
            const refreshData = await clientFetch(refreshEndpoint, {
              method: 'POST',
              headers: { 'Content-type': 'application/json; charset=UTF-8' },
              body: JSON.stringify({ refreshToken })
            })

            token = refreshData.accessToken || refreshData.token
            onTokensRefreshed(token, refreshData.refreshToken)

            headers.Authorization = `Bearer ${token}`
            data = await clientFetch(url, { 
              ...options, 
              headers, 
              _retry: true 
            })
          } catch (err) {
            console.error('Error auto-refreshing token:', err)
            onRefreshFailed()
            throw error // Lanzamos el error original 401 o el nuevo
          }
        } else {
          onRefreshFailed()
          throw error
        }
      } else {
        throw error
      }
    }

    return data
  }
}

export { createAuthClient }
