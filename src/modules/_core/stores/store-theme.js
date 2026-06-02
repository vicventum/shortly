import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { themeChange } from 'theme-change'

export const useThemeStore = create(
  persist(
    (set) => {
      // Inicializar theme-change al crear el store
      if (typeof window !== 'undefined') {
        themeChange(false)
      }

      const isUserThemeDark = 
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      const initialTheme =
        (typeof document !== 'undefined' &&
          document.querySelector('html')?.getAttribute('data-theme')) ??
        (isUserThemeDark ? 'cobalt' : 'light')

      return {
        // ── State ──
        theme: initialTheme,

        // ── Actions ──
        setTheme: (theme) => set({ theme }),
      }
    },
    {
      name: 'shortly.theme', // key en localStorage
      partialize: (state) => ({ theme: state.theme }), // solo persistir el tema
    }
  )
)
