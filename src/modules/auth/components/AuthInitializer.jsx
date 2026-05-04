import { useEffect } from 'react'
import { useAuthStore } from '@/modules/auth/stores/store-auth'

export function AuthInitializer() {
  const verifySession = useAuthStore((state) => state.verifySession)

  useEffect(() => {
    verifySession()
  }, [verifySession])

  return null
}
