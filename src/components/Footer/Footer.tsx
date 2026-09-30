import { Container } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { breakpoints } from '../../styles/breakpoints'
import { FooterCard } from '../FooterCard/FooterCard'
import { Logo } from '../Logo'
import googlePlayBanner from '../../assets/images/googleplay-banner.png'
import appStoreBanner from '../../assets/images/appstore-banner.png'

const FooterContainer = styled.div`
  min-height: 450px;
  color: var(--ds-color-text-on-inverse);
  background: var(--ds-color-surface-inverse);
  padding: 2rem 0;

  hr {
    color: var(--ds-color-text-on-inverse);
    width: 100%;
  }
`

const FooterTop = styled.div`
  display: grid;
  gap: 40px 24px;
  grid-template-columns: repeat(1, 1fr);
  @media ${breakpoints.S} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${breakpoints.L} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const Footer = () => {
  const navigationLinks = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Categories',
      href: '/categories',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Login',
      href: '/login',
    },
  ]

  const socialMediaLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      external: true,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      external: true,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      external: true,
    },
  ]

  return (
    <FooterContainer>
      <Container>
        <FooterTop>
          <Logo large logoOnly />
          <FooterCard title="Discover us" links={navigationLinks} />
          <FooterCard title="Our social media" links={socialMediaLinks} />
          <FooterCard title="Check our apps">
            <div className="footer-bottom">
              <img
                alt="app store link"
                style={{ width: '120px', marginBottom: '0.5rem' }}
                src={appStoreBanner}
              />
              <img alt="google play link" style={{ width: '120px' }} src={googlePlayBanner} />
            </div>
          </FooterCard>
        </FooterTop>
      </Container>
    </FooterContainer>
  )
}
