import { Link as DsLink, type LinkProps as DsLinkProps } from '@droppy-ui/design-system'
import { Link as RouterLink, type To } from 'react-router-dom'

export type LinkProps = Omit<DsLinkProps, 'href' | 'render'> & { to: To }

export const Link = ({ to, ...rest }: LinkProps) => (
  <DsLink render={<RouterLink to={to} />} {...rest} />
)
