import { FooterCard as DsFooterCard } from '@droppy-ui/design-system'
import { Link as RouterLink } from 'react-router-dom'

type FooterCardProps = {
  title: string
  links?: {
    external?: boolean
    name: string
    href: string
  }[]
}

export const FooterCard: React.FC<React.PropsWithChildren<FooterCardProps>> = ({
  title,
  links = [],
  children,
  ...rest
}) => (
  <DsFooterCard
    title={title}
    links={links.map(({ external, name, href }) => ({
      name,
      href,
      external,
      render: external ? undefined : <RouterLink to={href} />,
    }))}
    {...rest}
  >
    {children}
  </DsFooterCard>
)
