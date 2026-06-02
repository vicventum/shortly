import { defineConfig, mergeConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/vitest-setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    globals: false,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      'tests': fileURLToPath(new URL('./tests', import.meta.url)),
    },
  },
}))
