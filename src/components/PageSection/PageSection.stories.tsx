import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageSection } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/PageSection',
  component: PageSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Asian',
    children: <h1>Hello Dummy Content</h1>,
  },
}

export const WithButtons: Story = {
  args: {
    ...Default.args,
    title: 'Asian',
  },
}
