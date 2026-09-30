import { Badge, Body, Card, Heading, Review, Skeleton } from '@droppy-ui/design-system'
import styled from 'styled-components'

type RestaurantCardProps = {
  name: string
  rating?: number
  specialty: string
  photoUrl: string
  isClosed?: boolean
  categories?: string[]
  isLoading?: boolean
  isNew?: boolean
  onClick?: () => void
  className?: string
}

// Card imposes no layout of its own, so the width cap lives here.
const ConstrainedCard = styled(Card)`
  width: 100%;
  max-width: 500px;
`

const StyledContent = styled.div`
  padding: 24px;
  background: var(--ds-color-surface-card);
`

// A bespoke corner flag, not a Badge: it overlays the photo at heading size
// with its own fixed green-on-ink pairing, which no Badge variant provides.
const NewTag = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1;
  display: inline-block;
  padding: 8px;
  background: #e5f8bc;
  color: #2c2c2c;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 700;
`

const Closed = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  span {
    color: var(--ds-color-text-on-inverse);
    line-height: 210px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  display: flex;
`
const RestaurantImage = styled.img<{ $isClosed: boolean }>`
  height: 200px;
  width: 100%;
  object-fit: cover;
  filter: ${({ $isClosed }) => ($isClosed ? 'grayscale(1)' : 'none')};
`
const Description = styled(Body)`
  margin-top: 8px;
  margin-bottom: 24px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const StyledBadge = styled(Badge)`
  margin-top: var(--ds-space-sm);
  margin-right: var(--ds-space-2xs);
`

const StyledHeading = styled(Heading)`
  margin-bottom: 0.5em;
`

export const RestaurantCardSkeleton = () => (
  <ConstrainedCard data-testid="loading" role="status" aria-label="Loading restaurant">
    <Skeleton height={200} width="100%" />
    <StyledContent>
      <StyledHeading aria-hidden level={2} size={4}>
        <Skeleton width="50%" />
      </StyledHeading>
      <Body type="span">
        <Skeleton width="35%" />
      </Body>
      <Description>
        <Skeleton />
      </Description>
      <Body type="span">
        <Skeleton width="25%" height="23px" style={{ marginTop: 24 }} />
      </Body>
    </StyledContent>
  </ConstrainedCard>
)

export const RestaurantCard = ({
  photoUrl,
  name,
  specialty,
  rating,
  isClosed = false,
  isLoading = false,
  categories,
  isNew = false,
  className,
  onClick,
}: RestaurantCardProps) => {
  if (isLoading) {
    return <RestaurantCardSkeleton />
  }

  return (
    <ConstrainedCard
      interactive
      className={className}
      data-testid="restaurant-card"
      onClick={isClosed ? undefined : onClick}
    >
      {isNew && <NewTag>new</NewTag>}
      <ImageContainer>
        {isClosed && (
          <Closed>
            <Body type="span">This restaurant is closed.</Body>
          </Closed>
        )}
        <RestaurantImage $isClosed={isClosed} loading="lazy" src={photoUrl} alt="restaurant" />
      </ImageContainer>
      <StyledContent>
        <StyledHeading level={2} size={4}>
          {name}
        </StyledHeading>
        <Review rating={rating} />
        <Description fontWeight="regular">{specialty}</Description>
        {categories?.map((category) => (
          <StyledBadge key={category} text={category} />
        ))}
      </StyledContent>
    </ConstrainedCard>
  )
}
