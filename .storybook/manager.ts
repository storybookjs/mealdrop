import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'
import logo from '../src/assets/images/logo-black.svg'

const theme = create({
  base: 'light',

  // // Base colors
  // colorSecondary: '#9FC7CD', // blue-dark-1

  // // UI
  // appBg: '#F6F9FC',
  // appContentBg: '#FFFFFF',
  // appBorderColor: 'rgba(0,0,0,.1)',
  // appBorderRadius: 8,

  // // Typography
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // // Text colors
  // textColor: '#333333',
  // textInverseColor: '#FFFFFF',
  // textMutedColor: '#666666',

  // // Toolbar default and active colors
  // barTextColor: '#999999',
  // barSelectedColor: '#9FC7CD',
  // barBg: '#FFFFFF',

  // // Form colors
  // inputBg: '#FFFFFF',
  // inputBorder: 'rgba(0,0,0,.3)',
  // inputTextColor: '#333333',
  // inputBorderRadius: 4,

  // Brand assets
  brandTitle: 'Mealdrop',
  brandUrl: 'https://github.com/yannbf/mealdrop/',
  brandImage: logo,
})

addons.setConfig({
  theme,
  layout: {
    // show addons panel by default
    showPanel: true,
    // position addons panel on the right by default
    panelPosition: 'right',
  },
})
