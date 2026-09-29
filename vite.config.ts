import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import componentHighlighter from '@storybook/experimental-devtools/react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Storybook and Vitest both load this config, and the devtools dock and
  // component instrumentation only belong in the app's own dev server.
  const isAppDevServer =
    command === 'serve' && mode !== 'test' && !process.env.STORYBOOK && !process.env.VITEST

  return {
    devtools: {
      enabled: isAppDevServer,
    },
    plugins: [react(), ...(isAppDevServer ? [componentHighlighter()] : [])],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
    },
  }
})
