import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Badge,
  Body,
  Container,
  ErrorBlock,
  Heading,
  Review,
  Spinner,
  TopBanner,
} from '@droppy-ui/design-system'
import styled from 'styled-components'

import { PageTemplate } from '../../templates/PageTemplate'
import { useFetchRestaurant } from '../../api/hooks'
import { useAppDispatch, useAppSelector } from '../../app-state'
import { CartItem, clearItemAction, saveItemAction, selectCartItems } from '../../app-state/cart'
import { AnimatedIllustration } from '../../components/AnimatedIllustration'

import { FoodItemModal } from './components/FoodItemModal'
import { FoodSection } from './components/FoodSection'

const DetailSection = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  background: var(--ds-color-surface-overlay);
`

const MenuSection = styled.div`
  padding-top: 3rem;
  padding-bottom: 5rem;
  background: var(--ds-color-surface-sunken);
`

// The spinner is an inline primitive; centering it over the content area is
// the page's job. Height matches the template's content min-height.
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
`

const StyledBadge = styled(Badge)`
  margin-right: 1em;
`

const StyledReview = styled(Review)`
  margin-bottom: 0.5rem;
`

export const RestaurantDetailPage = () => {
  const { id = '' } = useParams<'id'>()

  const navigate = useNavigate()
  const { restaurant, status, retryRequest } = useFetchRestaurant(id)

  const [selectedItem, setSelectedItem] = useState<CartItem>()
  const closeModal = () => setSelectedItem(undefined)

  const cartItems = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const addItemToCart = (item: CartItem) => dispatch(saveItemAction(item))
  const clearItemFromCart = (item: CartItem) => dispatch(clearItemAction(item))

  if (status === '500') {
    return (
      <PageTemplate type="sticky-header">
        <ErrorBlock
          title="Something went wrong!"
          body="Our bad, something went wrong on our side."
          illustration={<AnimatedIllustration animation="NotFound" />}
          onButtonClick={retryRequest}
          buttonText="Try again"
        />
      </PageTemplate>
    )
  }

  if (status === '404') {
    return (
      <PageTemplate type="sticky-header">
        <ErrorBlock
          title="We can't find this page"
          body="This page doesn’t exist, keep looking."
          illustration={<AnimatedIllustration animation="Error" />}
          onButtonClick={() => navigate('/')}
          buttonText="Home"
        />
      </PageTemplate>
    )
  }

  if (status === 'loading') {
    return (
      <PageTemplate type="sticky-header">
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </PageTemplate>
    )
  }

  if (!restaurant) {
    return null
  }

  const { menu, name, rating, specialty, photoUrl, categories } = restaurant

  return (
    <PageTemplate type="sticky-header">
      <FoodItemModal
        item={selectedItem}
        cartItems={cartItems}
        onClose={closeModal}
        onItemSave={addItemToCart}
        onItemRemove={clearItemFromCart}
      />
      <TopBanner photoUrl={photoUrl} onBackClick={() => navigate(-1)} />
      <DetailSection>
        <Container>
          <Heading level={2}>{name}</Heading>
          <Body>Specialties: {specialty}</Body>
          <StyledReview rating={rating} />
          <div>
            {categories?.map((category) => (
              <StyledBadge key={category} text={category} />
            ))}
          </div>
        </Container>
      </DetailSection>
      <MenuSection>
        <Container>
          {menu.food && (
            <FoodSection
              title="To eat"
              items={menu.food}
              cartItems={cartItems}
              onItemClick={setSelectedItem}
            />
          )}
          {menu.dessert && (
            <FoodSection
              title="Dessert"
              items={menu.dessert}
              cartItems={cartItems}
              onItemClick={setSelectedItem}
            />
          )}
          {menu.drinks && (
            <FoodSection
              title="To drink"
              items={menu.drinks}
              cartItems={cartItems}
              onItemClick={setSelectedItem}
            />
          )}
        </Container>
      </MenuSection>
    </PageTemplate>
  )
}
