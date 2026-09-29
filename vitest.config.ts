import { mergeConfig, defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        projects: [
          {
            test: {
              name: 'node',
              environment: 'happy-dom',
              include: ['**/*.test.ts'],
            },
          },
          {
            extends: true,
            plugins: [
              // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
              storybookTest({
                configDir: '.storybook',
                storybookScript: 'yarn storybook --ci',
              }),
            ],
            publicDir: 'public',
            test: {
              name: 'storybook',
              browser: {
                enabled: true,
                headless: true,
                provider: playwright(),
                instances: [{ browser: 'chromium' }],
              },
            },
          },
        ],
        coverage: {
          include: ['./src/**/*.{ts,tsx}'],
          exclude: [
            '**/*.stories.*',
            'src/docs/**',
            'src/components/Button/utils.tsx',
            '**/conditional-logic.ts',
            '**/RestaurantCard/progress',
            '**/RestaurantsSection.container.tsx',
            'src/stub',
          ],
        },
      },
    })
  )
)
