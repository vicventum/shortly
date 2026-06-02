import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUrlStore = create(
  persist(
    (set, get) => ({
      // ── State ──
      urlList: [],

      // ── Actions ──
      addUrl: (url) => set((state) => ({ urlList: [url, ...state.urlList] })),
      
      // Getter para la lista actual (útil en mutaciones para evitar closures obsoletos)
      getUrlList: () => get().urlList,
    }),
    {
      name: 'shortly.urlShortenedList', // misma key que usaba useLocalStorage
    }
  )
)
