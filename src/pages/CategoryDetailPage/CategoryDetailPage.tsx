import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Container, ErrorBlock, TopBanner } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { useFetchRestaurantsByCategory } from '../../api/hooks'
import { PageTemplate } from '../../templates/PageTemplate'
import { RestaurantCard, RestaurantCardSkeleton } from '../../components/RestaurantCard'
import { categories } from '../../stub/categories'
import sushi from '../../assets/images/sushi.svg'
import { Restaurant } from '../../types'
import { Link } from '../../components/Link'

const StyledContainer = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(356px, 1fr));
  gap: 24px;
  display: grid;
  padding-bottom: 5rem;
`

export const CategoryDetailPage = () => {
  const { id } = useParams<'id'>()
  const navigate = useNavigate()

  const { restaurants, status } = useFetchRestaurantsByCategory(id)

  const category = categories.find((cat) => cat.id === id)

  return (
    <PageTemplate>
      <TopBanner
        title={category?.title || 'Oops!'}
        photoUrl={category?.photoUrl}
        onBackClick={() => navigate(-1)}
      />
      <Container>
        <Breadcrumb
          items={[
            { label: 'categories', render: <Link to="/categories" /> },
            { label: category?.title?.toLowerCase() || '' },
          ]}
        />
        {status === 'success' && restaurants.length <= 0 && (
          <ErrorBlock
            body="It seems that there are no restaurants in this category yet. Try to come back later?"
            title="This is not the food you're looking for."
            illustration={<img alt="no restaurants found" src={sushi} />}
            buttonText="See all restaurants"
            onButtonClick={() => {
              navigate('/categories')
            }}
          />
        )}
        <StyledContainer>
          {status === 'loading'
            ? Array.from({ length: 3 }).map((_, index) => <RestaurantCardSkeleton key={index} />)
            : restaurants.map((restaurant: Restaurant, index: number) => (
                <RestaurantCard
                  key={restaurant.name || index}
                  {...restaurant}
                  onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                />
              ))}
        </StyledContainer>
      </Container>
    </PageTemplate>
  )
}
