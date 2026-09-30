import { createGlobalStyle } from 'styled-components'

import { breakpoints } from './breakpoints'
import { resetCSS } from './CSSReset'

export const GlobalStyle = createGlobalStyle`
    ${resetCSS}
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src:
        local('Montserrat Regular'),
        local('Montserrat-Regular'),
        url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2)
          format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src:
        local('Montserrat Medium'),
        local('Montserrat-Medium'),
        url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_ZpC3gnD_vx3rCs.woff2)
          format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src:
        local('Montserrat Bold'),
        local('Montserrat-Bold'),
        url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD_vx3rCs.woff2)
          format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* latin */
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 900;
      src:
        local('Montserrat Black'),
        local('Montserrat-Black'),
        url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gnD_vx3rCs.woff2)
          format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Hind';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src:
        local('Hind Regular'),
        local('Hind-Regular'),
        url(https://fonts.gstatic.com/s/hind/v11/5aU69_a8oxmIdGl4BDGwgDI.woff2) format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Hind';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src:
        local('Hind Medium'),
        local('Hind-Medium'),
        url(https://fonts.gstatic.com/s/hind/v11/5aU19_a8oxmIfJpbERySjRhc9V0.woff2) format('woff2');
      unicode-range:
        U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
        U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    body {
      margin: 0;
      background: var(--ds-color-surface-page);
      /* Text colour is set here (not on *) so it inherits: a universal colour
         rule lands directly on every element, including svg, and overrides the
         design system's currentcolor-based icon colouring. */
      color: var(--ds-palette-neutral-900);
      font-family: 'Montserrat', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    * {
      box-sizing: border-box;
    }

    a {
      text-decoration: none;
      color: #222;
    }

    .bolder {
      font-weight: 900;
    }

    .container {
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 1.5rem;

      @media ${breakpoints.S} {
        padding: 0 4rem;
      }
    }

    .container-desktop {
      @media ${breakpoints.L} {
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
    }

    .copyright {
      color: white;
      text-align: end;
    }

    .footer-bottom {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .footer-bottom div {
      padding-left: 1rem;
    }

    @media only screen and (max-width: 640px) {
      html {
        font-size: 14px;
      }
    }
  `
