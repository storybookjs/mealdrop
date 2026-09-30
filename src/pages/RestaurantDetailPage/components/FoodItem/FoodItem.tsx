import { memo } from 'react'
import { Body, Card, Heading } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { toCurrency } from '../../../../helpers'

// Card's surface-card sits too close to the menu band's surface-sunken, so
// the item lifts to the overlay surface, the same pair the detail band uses.
const Container = styled(Card).attrs({ padded: true })`
  position: relative;
  background: var(--ds-color-surface-overlay);
  transition: box-shadow 0.1s ease-in;

  &:hover {
    cursor: pointer;
    box-shadow: var(--ds-shadow-lift);
  }
`

const Quantity = styled(Body)`
  padding: 0.25rem;
  width: 35px;
  height: 35px;
  border-radius: var(--ds-radius-control);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ds-color-chip-contrast-bg);
  color: var(--ds-color-chip-contrast-text);
  position: absolute;
  top: 0;
  right: 0;
`

const Description = styled(Body)`
  margin: 0;
  color: var(--ds-color-text-secondary);
  margin-top: 0.5rem;
`

const Price = styled(Body)`
  margin: 0;
  margin-top: 1rem;
`

type FoodItemProps = {
  quantity?: number
  name: string
  price: number
  description?: string
  onClick: () => void
}

export const FoodItem = memo(
  ({ quantity = 0, name, price, description, onClick }: FoodItemProps) => (
    <Container onClick={onClick}>
      <div>
        {quantity > 0 && (
          <Quantity aria-label="food quantity" type="span" fontWeight="medium">
            {quantity}
          </Quantity>
        )}
        <Heading level={4}>{name}</Heading>
        <Description>{description}</Description>
        <Price>{toCurrency(price)}</Price>
      </div>
    </Container>
  )
)
FoodItem.displayName = 'FoodItem'
