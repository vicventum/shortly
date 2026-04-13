import { clientFetch } from '@/modules/core/api/clients/client-fetch'

// const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL

/**
 * Factory para crear el cliente HTTP de autenticación.
 * 
 * @param {Object} config - Configuración de inyección de dependencias
 * @param {Function} config.getToken - Retorna el access token actual
 * @param {Function} config.getRefreshToken - Retorna el refresh token actual
 * @param {Function} config.onTokensRefreshed - Callback cuando se obtienen nuevos tokens `(accessToken, refreshToken) => void`
 * @param {Function} config.onRefreshFailed - Callback cuando el refresh falla (usado para limpiar sesión)
 */
const createAuthClient = ({
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

    // Manejar el error 401 e intentar refresh token automáticamente
    if (response.status === 401 && !options._retry) {
      const refreshToken = getRefreshToken()
      
      if (refreshToken) {
        try {
          const refreshResponse = await clientFetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ refreshToken })
          })

          if (refreshResponse.ok) {
            const data = await refreshResponse.json()
            
            token = data.accessToken
            onTokensRefreshed(data.accessToken, data.refreshToken)

            // Reintentar la solicitud original con el nuevo token
            headers.Authorization = `Bearer ${token}`
            response = await clientFetch(url, { 
              ...options, 
              headers, 
              _retry: true // Evita bucles infinitos
            })
          } else {
            // El refresh falló o ha caducado
            onRefreshFailed()
          }
        } catch (err) {
          console.error('Error auto-refreshing token:', err)
          onRefreshFailed()
        }
      } else {
        // No hay refresh token disponible
        onRefreshFailed()
      }
    }

    return response
  }
}

export { createAuthClient }

