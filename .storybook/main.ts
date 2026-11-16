import { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/docs/Introduction.mdx',
    '../src/docs/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    // 'storybook-addon-test-codegen' removed for the 11.0.0-beta.3 QA run: its preset imports storybook/internal/babel, which 11 removed (guide lists it as broken on 11)
    '@storybook/addon-designs',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
    'msw-storybook-addon',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  features: {
    experimentalCodeExamples: true,
  },
}
export default config
