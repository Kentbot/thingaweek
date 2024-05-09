import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: [ path.resolve(__dirname, './src/test-utils/setup.ts') ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app/'),
      'test-utils': path.resolve(__dirname, './src/test-utils')
    }
  },
})