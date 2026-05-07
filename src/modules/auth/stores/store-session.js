import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSessionStore = create(
  persist(
    (set) => ({
      // ── State ──
      user: null,

      // ── Actions ──
      setSession: (userData, accessToken, refreshToken) => {
        set({ user: userData })
        window.sessionStorage.setItem('shortly.accessToken', accessToken)
        if (refreshToken) {
          window.sessionStorage.setItem('shortly.refreshToken', refreshToken)
        }
      },

      cleanSession: () => {
        set({ user: null })
        window.sessionStorage.removeItem('shortly.accessToken')
        window.sessionStorage.removeItem('shortly.refreshToken')
      },

      getAccessToken: () => {
        return window.sessionStorage.getItem('shortly.accessToken')
      },

      updateUser: (partialData) => {
        set((state) => ({ user: { ...state.user, ...partialData } }))
      },
    }),
    {
      name: 'shortly.session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
)

// ── Selectores reutilizables ──
export const selectUser = (state) => state.user
export const selectIsAuthenticated = (state) => !!state.user
