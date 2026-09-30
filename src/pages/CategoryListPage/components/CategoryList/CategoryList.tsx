import styled from 'styled-components'

import { Category } from '../../../../components/Category'
import { breakpoints } from '../../../../styles/breakpoints'
import { Link } from '../../../../components/Link'

type CategoryItem = {
  id?: string
  title: string
  photoUrl: string
}

type CategoryListProps = {
  categories: CategoryItem[]
}

const StyledContainer = styled.div`
  gap: 12px;
  display: grid;
  padding-bottom: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  @media ${breakpoints.M} {
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media ${breakpoints.XL} {
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  }
`

export const CategoryList = ({ categories }: CategoryListProps) => (
  <StyledContainer>
    {categories.map((category) => (
      <Link key={category.id} to={`/categories/${category.id}`}>
        <Category {...category} title={category.title} />
      </Link>
    ))}
  </StyledContainer>
)
