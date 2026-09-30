import { useState, useCallback, useEffect } from 'react'
import { Body, Button, Heading, Modal, QuantityStepper } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { CartItem } from '../../../../app-state/cart'
import { toCurrency } from '../../../../helpers'
import { breakpoints } from '../../../../styles/breakpoints'

const StyledBody = styled(Body)`
  margin: 0;
  margin-top: 8px;
`

const StyledButton = styled(Button)`
  flex: 1;
`

// The stepper stays a compact group, per the platform convention for
// quantity controls, but with a wider gap than its default: the touch
// targets already clear 44pt, and the extra space keeps the pair from
// reading as cramped without breaking it apart.
const StyledQuantityStepper = styled(QuantityStepper)`
  gap: var(--ds-space-sm);
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.45;
  margin-bottom: 1.5rem;
  margin-right: 0;
  @media ${breakpoints.M} {
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`

const TopContainer = styled.div`
  padding: 2.5rem 1.5rem;
  background: var(--ds-color-surface-sunken);
  border-radius: 16px 16px 0px 0px;
`

const BottomContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  @media ${breakpoints.M} {
    flex-direction: row;
  }
`

type FoodItemModalProps = {
  item?: CartItem
  cartItems: CartItem[]
  onClose: () => void
  onItemSave: (item: CartItem) => void
  onItemRemove: (item: CartItem) => void
}

export const FoodItemModal = ({
  item,
  cartItems,
  onClose,
  onItemSave,
  onItemRemove,
}: FoodItemModalProps) => {
  const [quantity, setQuantity] = useState(0)

  const saveItem = useCallback(() => {
    if (item) {
      if (quantity === 0) {
        onItemRemove(item)
      } else {
        onItemSave({ ...item, quantity })
      }
    }

    onClose()
  }, [quantity, onClose, onItemRemove, item, onItemSave])

  useEffect(() => {
    const cartItem = item && cartItems.find((c) => c.id === item.id)
    setQuantity(cartItem?.quantity || 1)
    return () => setQuantity(0)
  }, [cartItems, item])

  return (
    <Modal isOpen={!!item} onClose={onClose} container="#modal">
      {item && (
        <div>
          <TopContainer>
            <Heading>{item.name}</Heading>
            <StyledBody>{item.description}</StyledBody>
          </TopContainer>
          <BottomContainer>
            <ButtonsContainer>
              <StyledQuantityStepper value={quantity} onChange={setQuantity} min={1} max={10} />
            </ButtonsContainer>
            <StyledButton aria-label="confirm" onClick={saveItem}>
              add for {toCurrency(item.price * quantity)}
            </StyledButton>
          </BottomContainer>
        </div>
      )}
    </Modal>
  )
}
