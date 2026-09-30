import { Body } from '@droppy-ui/design-system'
import styled from 'styled-components'

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
`

export const Quantity = styled(Body)`
  flex: 0.1;
`

export const Name = styled(Body)`
  flex: 0.6;
`

export const Price = styled(Body)`
  flex: 0.3;
  text-align: right;
`
