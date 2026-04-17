import { createAuthClient } from './client-fetch-auth-factory'

// Instancia global configurada del cliente autenticado.
// Al residir en 'core', estará disponible de forma segura para otros módulos (ej. url-shortening)
// que necesiten hacer peticiones portando un token de sesión.
const clientFetchAuth = createAuthClient({
  refreshEndpoint: '/auth/refresh',
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
  },
})

export { clientFetchAuth }
