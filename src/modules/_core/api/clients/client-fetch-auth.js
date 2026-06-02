import { createAuthClient } from './client-fetch-auth-factory'
import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'

// Instancia global configurada del cliente autenticado.
// Al residir en 'core', estarÃ¡ disponible de forma segura para otros mÃ³dulos (ej. url-shortening)
// que necesiten hacer peticiones portando un token de sesiÃ³n.
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

