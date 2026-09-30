import { useNavigate } from 'react-router-dom'
import { Carousel, PageSection } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { Category, CategoryProps } from '../../../../components/Category'
import { Link } from '../../../../components/Link'

type CategoriesSectionProps = {
  categories: CategoryProps[]
}

const StyledLink = styled(Link)`
  width: 100%;
  margin-right: 1rem;
`

export const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  const navigate = useNavigate()

  return (
    <PageSection
      title="Categories"
      topButtonLabel="View all categories"
      onTopButtonClick={() => navigate('/categories')}
    >
      <Carousel
        itemsPerView={{ mobile: 2, tablet: 3, desktop: 6 }}
        slidesToScroll={{ mobile: 3, desktop: 3 }}
      >
        {categories.map((category) => (
          <StyledLink key={category.id} to={`/categories/${category.id}`}>
            <Category round {...category} />
          </StyledLink>
        ))}
      </Carousel>
    </PageSection>
  )
}
