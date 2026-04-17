import { createContext, useState, useEffect, useRef, useCallback } from 'react'
import { verify } from '@/modules/auth/api/services/service-auth'
import { meUser as verifyProvider } from '@/modules/auth/api/providers/provider-auth-fetch'

export const AuthContext = createContext(null)

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const accessTokenRef = useRef(null)
  const refreshTokenRef = useRef(null)

  const verifySession = useCallback(async () => {
    setIsLoading(true)
    try {
      const accessToken = window.localStorage.getItem('shortly.accessToken')

      if (
        !accessToken ||
        accessToken === 'undefined' ||
        accessToken === 'null'
      ) {
        setIsLoading(false)
        return
      }

      accessTokenRef.current = accessToken
      refreshTokenRef.current = window.localStorage.getItem(
        'shortly.refreshToken'
      )

      // La responsabilidad de obtener la data decae en el clientAuthFetch
      const data = await verify(verifyProvider, { payload: { accessToken } })

      setUser(data.user || data)
    } catch (err) {
      console.error('Session verification failed:', err)
      logout()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    verifySession()
  }, [verifySession])

  const loginContext = (userData, accessToken, refreshToken) => {
    setUser(userData)
    accessTokenRef.current = accessToken
    refreshTokenRef.current = refreshToken
    window.localStorage.setItem('shortly.accessToken', accessToken)
    window.localStorage.setItem('shortly.refreshToken', refreshToken)
  }

  const registerContext = (userData, accessToken, refreshToken) => {
    loginContext(userData, accessToken, refreshToken)
  }

  const logout = () => {
    setUser(null)
    accessTokenRef.current = null
    refreshTokenRef.current = null
    window.localStorage.removeItem('shortly.accessToken')
    window.localStorage.removeItem('shortly.refreshToken')
  }

  const getAccessToken = () => accessTokenRef.current

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginContext,
    registerContext,
    logout,
    getAccessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
