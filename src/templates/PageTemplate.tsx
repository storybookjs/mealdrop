import * as React from 'react'
import { PageTemplate as DsPageTemplate } from '@droppy-ui/design-system'

import { Header, HeaderComponent } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

type PageTemplateProperties = {
  type?: 'default' | 'sticky-header' | 'basic'
}

const headers = {
  default: <Header />,
  'sticky-header': <Header sticky />,
  basic: <HeaderComponent logoOnly />,
}

export const PageTemplate: React.FC<React.PropsWithChildren<PageTemplateProperties>> = ({
  type = 'default',
  children,
  ...rest
}) => (
  <DsPageTemplate
    header={headers[type]}
    footer={type === 'basic' ? undefined : <Footer />}
    {...rest}
  >
    {children}
  </DsPageTemplate>
)
