import { useNavigate } from 'react-router-dom'
import { Carousel, PageSection } from '@droppy-ui/design-system'

import { useFetchRestaurants } from '../../../../api/hooks'
import { RestaurantCard, RestaurantCardSkeleton } from '../../../../components/RestaurantCard'
import { Restaurant } from '../../../../types'

type RestaurantsSectionProps = {
  title: string
}

type RestaurantsSectionComponentProps = {
  title: string
  restaurants: Restaurant[]
  isLoading?: boolean
  onRestaurantClick: (id: string) => void
}

// Presentational component, receives input and outputs events
export const RestaurantsSectionComponent = ({
  title,
  restaurants,
  onRestaurantClick,
  isLoading,
}: RestaurantsSectionComponentProps) => {
  return (
    <PageSection title={title}>
      <Carousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} slidesToScroll={{ desktop: 3 }}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <RestaurantCardSkeleton key={index} />)
          : restaurants.map((restaurant: Restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                {...restaurant}
                onClick={() => onRestaurantClick(restaurant.id!)}
              />
            ))}
      </Carousel>
    </PageSection>
  )
}

// Container component, takes care of logic and passes info down to presentational component
export const RestaurantsSection = ({ title }: RestaurantsSectionProps) => {
  const navigate = useNavigate()

  const { restaurants, status } = useFetchRestaurants()

  return (
    <RestaurantsSectionComponent
      title={title}
      restaurants={restaurants}
      isLoading={status === 'loading'}
      onRestaurantClick={(id: string) => navigate(`/restaurants/${id}`)}
    />
  )
}
