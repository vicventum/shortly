import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { verify } from '@/modules/auth/api/services/service-auth'
import { meUser as verifyProvider } from '@/modules/auth/api/providers/provider-auth-fetch'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ──
      user: null,
      isLoading: true,

      // ── Actions ──
      login: (userData, accessToken, refreshToken) => {
        set({ user: userData })
        window.localStorage.setItem('shortly.accessToken', accessToken)
        window.localStorage.setItem('shortly.refreshToken', refreshToken)
      },

      register: (userData, accessToken, refreshToken) => {
        get().login(userData, accessToken, refreshToken)
      },

      logout: () => {
        set({ user: null })
        window.localStorage.removeItem('shortly.accessToken')
        window.localStorage.removeItem('shortly.refreshToken')
      },

      getAccessToken: () => {
        return window.localStorage.getItem('shortly.accessToken')
      },

      verifySession: async () => {
        set({ isLoading: true })
        try {
          const accessToken = window.localStorage.getItem('shortly.accessToken')

          if (
            !accessToken ||
            accessToken === 'undefined' ||
            accessToken === 'null'
          ) {
            set({ isLoading: false })
            return
          }

          const data = await verify(verifyProvider, { payload: { accessToken } })
          set({ user: data.user || data })
        } catch (err) {
          console.error('Session verification failed:', err)
          get().logout()
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'shortly.auth',
      partialize: (state) => ({ user: state.user }), // solo persistir user, NO isLoading
    }
  )
)

// ── Selectores reutilizables ──
export const selectUser = (state) => state.user
export const selectIsLoading = (state) => state.isLoading
export const selectIsAuthenticated = (state) => !!state.user
