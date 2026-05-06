import { useEffect } from 'react'
import { useSessionStore } from '@/modules/auth/stores/store-session'
import { verify } from '@/modules/auth/api/services/service-auth'
import { meUser as verifyProvider } from '@/modules/auth/api/providers/provider-auth-fetch'

export function useVerifySession() {
  const getAccessToken = useSessionStore((state) => state.getAccessToken)
  const cleanSession = useSessionStore((state) => state.cleanSession)

  useEffect(() => {
    const verifySession = async () => {
      try {
        const accessToken = getAccessToken()

        if (!accessToken || accessToken === 'undefined' || accessToken === 'null') {
          return
        }

        const data = await verify(verifyProvider, { payload: { accessToken } })
        // Restaurar user sin sobrescribir tokens existentes en sessionStorage
        useSessionStore.setState({ user: data.user || data })
      } catch (err) {
        console.error('Session verification failed:', err)
        cleanSession()
      }
    }

    verifySession()
  }, [getAccessToken, cleanSession])
}
