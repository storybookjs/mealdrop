import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { experimental_vitePlugin } from '@storybook/vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), experimental_vitePlugin({})],

  devtools: {
    apply: 'serve',
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
