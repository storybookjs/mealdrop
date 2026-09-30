import { Body, Card, Heading } from '@droppy-ui/design-system'
import styled, { css } from 'styled-components'

export const StyledHeading = styled(Heading)<{ $withMargin?: boolean }>(
  ({ $withMargin = false }) => css`
    margin-bottom: ${$withMargin ? '1.5rem' : 0};
  `
)

// surface-default, not Card's surface-card: the summary sits on sunken or
// highlighted page bands, where the card tone would blend in.
export const OrderSummaryContainer = styled(Card).attrs({ padded: true })`
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  background: var(--ds-color-surface-default);
`

export const BottomContainer = styled.div`
  margin-top: auto;
  border-top: 1px solid var(--ds-color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const EmptyMessageContainer = styled(Body).attrs({ type: 'span' })`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
