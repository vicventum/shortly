import { createAuthClient } from './client-fetch-auth-factory'

// Instancia global configurada del cliente autenticado.
// Al residir en 'core', estará disponible de forma segura para otros módulos (ej. url-shortening)
// que necesiten hacer peticiones portando un token de sesión.
const clientFetchAuth = createAuthClient({
  refreshEndpoint: '/auth/refresh',
  getToken: () => window.sessionStorage.getItem('shortly.accessToken'),
  getRefreshToken: () => window.sessionStorage.getItem('shortly.refreshToken'),
  onTokensRefreshed: (token, refreshToken) => {
    window.sessionStorage.setItem('shortly.accessToken', token)
    if (refreshToken) {
      window.sessionStorage.setItem('shortly.refreshToken', refreshToken)
    }
  },
  onRefreshFailed: () => {
    window.sessionStorage.removeItem('shortly.accessToken')
    window.sessionStorage.removeItem('shortly.refreshToken')
  },
})

export { clientFetchAuth }
