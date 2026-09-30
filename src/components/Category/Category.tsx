import { Badge, Body, Card } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { breakpoints } from '../../styles/breakpoints'

export type CategoryProps = {
  id?: string
  title: string
  photoUrl: string
  round?: boolean
}

const SquaredContainer = styled.figure`
  display: flex;
  cursor: pointer;
  position: relative;
  flex-direction: row;
  align-items: start;
  border-radius: var(--ds-radius-card);
  background: transparent;
  height: 100%;
  width: 100%;
  min-width: 50px;
  max-height: 309px;
  margin: 0;
  padding: 0;

  &:hover {
    opacity: 0.9;
  }
`

// Squared tiles stay a plain figure (transparent, no shell) — only the round
// avatar tile is a card. Layout only; the shell (background, radius, shadow,
// hover dim) comes from Card.
const RoundCard = styled(Card).attrs({ interactive: true })`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  min-width: 50px;
  max-width: 200px;
  max-height: 200px;
  margin: 0;
  padding: 1.5rem 2rem;

  @media ${breakpoints.M} {
    padding: 1.5rem 0;
  }
`

const Image = styled.img`
  object-fit: cover;
  width: auto;
  border-radius: var(--ds-radius-card);
  width: 100%;
  height: 100%;
  min-width: 50px;
  min-height: 50px;
  max-height: 300px;
`

const RoundImage = styled(Image)`
  border-radius: var(--ds-radius-round);
  width: 4.5rem;
  height: 4.5rem;
  min-width: 4.5rem;
  min-height: 4.5rem;
  max-height: 200px;
  @media ${breakpoints.M} {
    width: 6.5rem;
    height: 6.5rem;
    min-width: 6.5rem;
    min-height: 6.5rem;
  }
`

// Badge's chip, floated over the photo. The photo backdrop needs the contrast
// pairing and body-size type rather than the in-flow badge defaults.
const FloatingTitle = styled(Badge)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  border-radius: var(--ds-radius-card);
  background-color: var(--ds-color-chip-contrast-bg);
  color: var(--ds-color-text-on-inverse);
  padding: 8px 16px;
  font-size: var(--ds-type-size-md);
  font-weight: var(--ds-type-weight-medium);
  line-height: normal;
  text-transform: none;
  text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.5);
`

const Title = styled(Body)`
  padding-top: 1rem;
`

const Rounded = ({ title, photoUrl: url }: CategoryProps) => (
  <RoundCard data-testid={title}>
    <RoundImage src={url} alt="restaurant category" />
    <Title type="span">{title}</Title>
  </RoundCard>
)

const Squared = ({ title, photoUrl: url }: CategoryProps) => (
  <SquaredContainer data-testid={title}>
    <Image src={url} alt="restaurant category" />
    <FloatingTitle text={title} />
  </SquaredContainer>
)

export const Category = ({ photoUrl, title, round = false }: CategoryProps) =>
  round ? (
    <Rounded photoUrl={photoUrl} title={title} />
  ) : (
    <Squared photoUrl={photoUrl} title={title} />
  )
