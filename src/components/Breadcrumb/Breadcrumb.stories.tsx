import { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from '@droppy-ui/design-system'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const SingleItem: Story = {
  args: {
    items: [{ label: 'categories' }],
  },
}

export const MultipleItems: Story = {
  args: {
    items: [
      { label: 'home', href: '/' },
      { label: 'categories', href: '/categories' },
      { label: 'sushi' },
    ],
  },
}
