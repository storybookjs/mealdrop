import { Heading } from '@droppy-ui/design-system'
import styled, { css, keyframes } from 'styled-components'

import { breakpoints } from '../../styles/breakpoints'

const shine = (color: string) => keyframes`
  to {
    fill: ${color};
  }
`

const pathStyles = (color: string, delay: number, animated: boolean) => css`
  animation: ${animated ? shine(color) : 'none'} 400ms ease-in;
  animation-delay: ${delay}ms;
  animation-iteration-count: 3;
  &:hover {
    fill: ${color};
  }
`

const SvgContainer = styled.svg<{ $large: boolean; $logoOnly: boolean; $animated: boolean }>(
  ({ $large, $logoOnly, $animated }) => css`
    .logo--face-left {
      fill: var(--ds-palette-brand-200);
    }
    .logo--face-right {
      fill: var(--ds-palette-brand-300);
    }
    .logo--ear-bottom-right {
      fill: var(--ds-palette-brand-400);
    }
    .logo--ear-bottom-left {
      fill: var(--ds-palette-brand-400);
    }
    .logo--ear-top-right {
      fill: var(--ds-palette-brand-500);
    }
    .logo--ear-top-left {
      fill: var(--ds-palette-brand-500);
    }
    .logo--nose {
      fill: var(--ds-palette-brand-nose);
    }

    [data-ds-theme='dark'] & {
      .logo--face-left {
        fill: var(--ds-palette-brand-dark-100);
      }
      .logo--face-right {
        fill: var(--ds-palette-brand-dark-300);
      }
      .logo--ear-bottom-right {
        fill: var(--ds-palette-brand-dark-200);
      }
      .logo--ear-bottom-left {
        fill: var(--ds-palette-brand-dark-200);
      }
      .logo--ear-top-right {
        fill: var(--ds-palette-brand-dark-400);
      }
      .logo--ear-top-left {
        fill: var(--ds-palette-brand-dark-400);
      }
      .logo--nose {
        fill: var(--ds-palette-neutral-0);
      }
    }

    .logo--ear-top-left {
      ${pathStyles('var(--ds-palette-brand-shine)', 50, $animated)};
    }
    .logo--ear-bottom-left {
      ${pathStyles('var(--ds-palette-brand-shine)', 100, $animated)};
    }
    .logo--face-left {
      ${pathStyles('var(--ds-palette-brand-shine)', 150, $animated)};
    }
    .logo--face-right {
      ${pathStyles('var(--ds-palette-brand-shine)', 200, $animated)};
    }
    .logo--ear-bottom-right {
      ${pathStyles('var(--ds-palette-brand-shine)', 250, $animated)};
    }
    .logo--ear-top-right {
      ${pathStyles('var(--ds-palette-brand-shine)', 300, $animated)};
    }

    [data-ds-theme='dark'] & {
      .logo--ear-top-left {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 50, $animated)};
      }
      .logo--ear-bottom-left {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 100, $animated)};
      }
      .logo--face-left {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 150, $animated)};
      }
      .logo--face-right {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 200, $animated)};
      }
      .logo--ear-bottom-right {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 250, $animated)};
      }
      .logo--ear-top-right {
        ${pathStyles('var(--ds-palette-brand-dark-shine)', 300, $animated)};
      }
    }

    padding-right: ${$logoOnly ? '0' : '0.75rem'};
    height: ${$large ? '75px' : '24px'};
    @media ${breakpoints.S} {
      height: ${$large ? '150px' : '24px'};
    }
  `
)

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

type LogoProps = {
  large?: boolean
  logoOnly?: boolean
  animated?: boolean
}

export const Logo = ({ large = false, logoOnly = false, animated = false }: LogoProps) => (
  <LogoContainer>
    <SvgContainer
      $animated={animated}
      $large={large}
      $logoOnly={logoOnly}
      viewBox="0 0 23 20"
      fill="none"
    >
      <path
        className="logo--face-left"
        d="M11.74 19.1662L6.66566 14.0788L0.82428 11.0619L1.76834 4.49574L0.82428 0.029541L11.74 2.1887V19.1662Z"
      />
      <path
        className="logo--face-right"
        d="M11.74 19.1366L16.8143 14.0493L22.6557 11.0619L21.7116 4.49574L22.6557 0.029541L11.74 2.1887V19.1366Z"
      />
      <path
        className="logo--ear-bottom-right"
        d="M22.6262 10.8549L14.4246 2.72113L22.6262 0L21.7411 4.61408L22.6262 10.8549Z"
      />
      <path
        className="logo--ear-bottom-left"
        d="M0.883118 10.8549L9.11415 2.69155L0.883118 0L1.79768 4.61408L0.883118 10.8549Z"
      />
      <path
        className="logo--ear-top-right"
        d="M21.7115 4.55497C21.564 4.58455 14.454 2.78033 14.454 2.78033L22.5671 0.0592041L21.7115 4.55497Z"
      />
      <path
        className="logo--ear-top-left"
        d="M1.79794 4.58452C1.94545 4.6141 9.05541 2.80987 9.05541 2.80987L0.942383 0.0887451L1.79794 4.58452Z"
      />
      <path
        className="logo--nose"
        d="M13.3626 17.5394L11.74 16.4451L10.1174 17.5394L11.74 19.1366L13.3626 17.5394Z"
      />
    </SvgContainer>
    {!logoOnly && (
      <Heading level={2} size={4}>
        MealDrop
      </Heading>
    )}
  </LogoContainer>
)
