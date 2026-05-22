import { createAuthClient } from './client-fetch-auth-factory'
import { useSessionStore } from '@/modules/auth/stores/store-session'

// Instancia global configurada del cliente autenticado.
// Al residir en 'core', estará disponible de forma segura para otros módulos (ej. url-shortening)
// que necesiten hacer peticiones portando un token de sesión.
const clientFetchAuth = createAuthClient({
  refreshEndpoint: '/auth/refresh',
  getToken: () => useSessionStore.getState().getAccessToken(),
  getRefreshToken: () => useSessionStore.getState().getRefreshToken(),
  onTokensRefreshed: (token, refreshToken) => {
    useSessionStore.getState().updateTokens(token, refreshToken)
  },
  onRefreshFailed: () => {
    useSessionStore.getState().cleanSession()
  },
})

export { clientFetchAuth }
