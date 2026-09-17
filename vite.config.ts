import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { DevTools } from '@vitejs/devtools'
import componentHighlighter from '@storybook/experimental-devtools/react'

// Storybook and Vitest both load this config, and the devtools dock and
// component instrumentation only belong in the app's own dev server.
const isAppDevServer = !process.env.STORYBOOK && !process.env.VITEST

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...(isAppDevServer ? [DevTools(), componentHighlighter()] : [])],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
