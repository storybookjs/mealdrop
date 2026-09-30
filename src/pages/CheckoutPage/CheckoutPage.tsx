import { Container, Heading } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { useAppSelector } from '../../app-state'
import { OrderSummary } from '../../components/ShoppingCart'
import { selectCartItems } from '../../app-state/cart'
import { breakpoints } from '../../styles/breakpoints'
import { PageTemplate } from '../../templates/PageTemplate'

import { MultiStepForm } from './components/registration-form/MultiStepForm'

const OrderDetailsContainer = styled.div`
  width: 100%;
  margin-bottom: 4rem;

  @media ${breakpoints.M} {
    width: 420px;
  }
`

const TopContainer = styled.div`
  padding-top: 3.25em;
  margin-bottom: 1em;
  min-height: 260px;
  background: var(--ds-color-surface-highlight);

  @media ${breakpoints.M} {
    padding-top: 5.25em;
    min-height: 300px;
  }
`

// The negative margin pulls the checkout content up over TopContainer's
// band. It lives on this wrapper rather than on the Container because the
// design system's .droppy-Container sets its own margins.
const BottomPull = styled.div`
  margin-top: -12rem;

  @media ${breakpoints.S} {
    margin-top: -10rem;
  }
`

const BottomContainer = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  align-items: flex-start;

  @media ${breakpoints.S} {
    flex-direction: row;
  }
`

const StyledHeading = styled(Heading)`
  margin: 0 auto;
`

// The band under the checkout header is a tinted page surface the white
// panels sit on; surface-page would melt the panels into it. No semantic
// token pairs these values — same palette composition as SuccessPage.
const ContentContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 5.25em;
  background: var(--ds-palette-neutral-50);

  [data-ds-theme='dark'] & {
    background: var(--ds-palette-neutral-950);
  }
`

export const CheckoutPage = () => {
  const cartItems = useAppSelector(selectCartItems)

  return (
    <PageTemplate type="basic">
      <ContentContainer>
        <TopContainer>
          <StyledHeading level={2} className="container">
            Checkout
          </StyledHeading>
        </TopContainer>
        <BottomPull>
          <BottomContainer>
            <MultiStepForm />
            <OrderDetailsContainer>
              <OrderSummary cartItems={cartItems} />
            </OrderDetailsContainer>
          </BottomContainer>
        </BottomPull>
      </ContentContainer>
    </PageTemplate>
  )
}
