import { Body, Button, type ButtonProps } from '@droppy-ui/design-system'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useDarkMode from 'use-dark-mode'

import { Link } from '../Link'

import { useAppDispatch, useAppSelector } from '../../app-state'
import {
  CartItem,
  saveItemAction,
  selectCartItems,
  selectCartTotal,
  selectCartVisibility,
  toggleVisibilityAction,
} from '../../app-state/cart'
import { breakpoints } from '../../styles/breakpoints'
import { ShoppingCartMenu } from '../ShoppingCartMenu'
import { toCurrency } from '../../helpers'
import { Logo } from '../Logo'

export const HeaderContainer = styled.div<{ $sticky: boolean }>(
  ({ $sticky }) => css`
    display: flex;
    justify-content: space-between;
    height: 56px;
    border-bottom: 1px solid var(--ds-color-border-subtle);
    top: 0;
    left: 0;
    position: sticky;
    background: var(--ds-color-surface-default);
    z-index: 2;
    width: 100%;
    padding: 0 1.5rem;

    @media ${breakpoints.S} {
      padding: 0 4rem;
    }

    @media ${breakpoints.M} {
      position: ${$sticky ? 'sticky' : 'relative'};
      height: 72px;
    }
  `
)

export const LogoContainer = styled(Link)`
  width: 40px;
  display: flex;
  padding-left: 1rem;

  & img {
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    width: 30px;
    padding: 0;
  }
`

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .navigation-items {
    display: none;
  }

  a {
    margin-right: 0.5rem;
  }

  @media ${breakpoints.M} {
    .navigation-items {
      display: contents;
    }
    width: 80%;
  }
`

// The label sits inside the primary cart Button, so its color must pair
// with the button surface, not the page; the opacity mutes it below the
// amount while keeping the on-primary contrast pair.
export const CartText = styled(Body)`
  display: none;
  @media ${breakpoints.M} {
    display: inline-block;
    color: var(--ds-color-action-on-primary);
    opacity: 0.8;
    margin-right: 0.25rem;
  }
`

export const CartTotal = styled(Body)`
  display: inline-block;
  color: var(--ds-color-action-on-primary);
`

// One flex child for both labels: Button's gap separates its children, so
// left as siblings the label and amount would inherit the icon-to-label gap
// instead of the tighter spacing CartText's margin defines.
const CartLabel = styled.span`
  display: inline-block;
`

const ThemeToggle = (props: Omit<ButtonProps, 'icon' | 'onClick'>) => {
  const darkMode = useDarkMode(false, { global: globalThis.window })
  return (
    <Button
      round
      clear
      aria-label={`turn on ${darkMode.value ? 'light' : 'dark'} mode`}
      icon={darkMode.value ? 'moon' : 'sun'}
      onClick={darkMode.toggle}
      {...props}
    />
  )
}

type HeaderComponentProps = {
  isCartVisible?: boolean
  cartItems?: CartItem[]
  totalPrice?: number
  logoOnly?: boolean
  sticky?: boolean
  toggleCartVisibility?: () => void
  goToCheckout?: () => void
  saveItem?: (item: CartItem) => void
}

export const HeaderComponent = ({
  isCartVisible = false,
  logoOnly = false,
  sticky = false,
  totalPrice = 0,
  cartItems = [],
  toggleCartVisibility = () => {},
  goToCheckout = () => {},
  saveItem = () => {},
}: HeaderComponentProps) => (
  <HeaderContainer data-testid="header" $sticky={sticky}>
    <LogoContainer to="/" aria-label="go to home page">
      <Logo />
    </LogoContainer>
    {!logoOnly && (
      <>
        <OptionsContainer>
          <span className="navigation-items">
            <ThemeToggle />
            <Link to="/" tabIndex={-1}>
              <Button clear>Home</Button>
            </Link>
            <Link to="/categories" tabIndex={-1}>
              <Button clear>All restaurants</Button>
            </Link>
          </span>
          <Button aria-label="food cart" icon="cart" onClick={toggleCartVisibility}>
            {totalPrice > 0 && (
              <CartLabel>
                <CartText type="span">Order</CartText>
                <CartTotal type="span">{toCurrency(totalPrice)}</CartTotal>
              </CartLabel>
            )}
          </Button>
        </OptionsContainer>
        <ShoppingCartMenu
          isOpen={isCartVisible}
          onClose={toggleCartVisibility}
          onGoToCheckoutClick={goToCheckout}
          cartItems={cartItems}
          totalPrice={totalPrice}
          onItemChange={saveItem}
        />
      </>
    )}
  </HeaderContainer>
)

export const Header = ({ sticky }: { sticky?: boolean }) => {
  const isCartVisible = useAppSelector(selectCartVisibility)
  const cartItems = useAppSelector(selectCartItems)
  const totalPrice = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toggleCartVisibility = () => dispatch(toggleVisibilityAction())
  const saveItem = (item: CartItem) => dispatch(saveItemAction(item))

  const goToCheckout = () => {
    toggleCartVisibility()
    navigate('/checkout')
  }

  return (
    <HeaderComponent
      sticky={sticky}
      goToCheckout={goToCheckout}
      cartItems={cartItems}
      isCartVisible={isCartVisible}
      toggleCartVisibility={toggleCartVisibility}
      totalPrice={totalPrice}
      saveItem={saveItem}
    />
  )
}
