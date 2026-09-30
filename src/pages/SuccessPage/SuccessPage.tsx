import { Body, Heading, TopBanner } from '@droppy-ui/design-system'
import styled, { css } from 'styled-components'

import ladies from '../../assets/images/ladies-sushi.svg'
import { useAppSelector } from '../../app-state'
import { selectOrderItems } from '../../app-state/order'
import { PageTemplate } from '../../templates/PageTemplate'
import { Link } from '../../components/Link'
import { OrderSummary } from '../../components/ShoppingCart'
import { breakpoints } from '../../styles/breakpoints'

const Image = styled.div<{ src: string }>(
  ({ src }) => css`
    background: url(${src});
    width: 100%;
    height: 230px;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100%;
    position: relative;
    margin: 0 auto;
    bottom: 0;
    right: 0;
    left: 0;
    background-size: 600px;
    display: flex;
    justify-content: center;
    @media ${breakpoints.S} {
      height: 368px;
      width: 700px;
      background-size: contain;
    }
  `
)

const StyledHeading = styled(Heading)`
  margin-bottom: 1.5rem;
`

// No semantic token pairs these values: composed from palette variables
// with an explicit dark override.
const Container = styled.div`
  background: var(--ds-palette-neutral-50);
  min-height: 100vh;

  [data-ds-theme='dark'] & {
    background: var(--ds-palette-neutral-950);
  }
`

const OrderSummaryContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
`

const ContinueBrowsing = styled(Link)`
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  text-align: center;
  text-decoration: underline;
`

export const SuccessPage = () => {
  const orderItems = useAppSelector(selectOrderItems)
  return (
    <PageTemplate type="basic">
      <Container>
        <TopBanner title="Order confirmed!" />
        <OrderSummaryContainer>
          <Body type="span">Estimated delivery</Body>
          <StyledHeading level={2}>13:23 today</StyledHeading>
          <OrderSummary cartItems={orderItems} />
          <ContinueBrowsing to="/">Continue browsing</ContinueBrowsing>
        </OrderSummaryContainer>
        <Image src={ladies} />
      </Container>
    </PageTemplate>
  )
}
