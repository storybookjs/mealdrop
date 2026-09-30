import styled from 'styled-components'
import { memo } from 'react'
import { Heading } from '@droppy-ui/design-system'

import { breakpoints } from '../../../../styles/breakpoints'
import { FoodItem } from '../FoodItem/FoodItem'
import type { CartItem } from '../../../../app-state/cart'
import type { FoodMenuItem } from '../../../../types'

type FoodSectionProps = {
  items: FoodMenuItem[]
  title: string
  cartItems: CartItem[]
  onItemClick?: (item: CartItem) => void
}

const StyledHeading = styled(Heading)`
  margin-bottom: 1.5rem;
`
const StyledContainer = styled.div`
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  display: grid;
  padding-bottom: 3rem;

  @media ${breakpoints.M} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoints.L} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FoodSection = memo(
  ({ title, cartItems, items, onItemClick = () => {} }: FoodSectionProps) => (
    <div>
      <StyledHeading level={3}>{title}</StyledHeading>
      <StyledContainer>
        {items.map((item: FoodMenuItem) => {
          const cartItem = cartItems.find((c) => c.id === item.id)
          const quantity = cartItem?.quantity || 0
          return (
            <FoodItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={quantity}
              onClick={() => onItemClick(item as CartItem)}
            />
          )
        })}
      </StyledContainer>
    </div>
  )
)
FoodSection.displayName = 'FoodSection'
