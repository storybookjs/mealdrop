import type { Meta, StoryObj } from '@storybook/react-vite'

import { Body } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/Typography/Body',
  component: Body,
  argTypes: {
    children: { controls: 'text' },
    size: { table: { disable: true } },
  },
} satisfies Meta<typeof Body>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '',
  },
  render: ({ children }) => (
    <div>
      <Body>{children || 'Body'}</Body>
      <Body size="S">{children || 'Body S'}</Body>
      <Body size="XS">{children || 'Body XS'}</Body>
      <Body size="XXS">{children || 'Body XXS'}</Body>
    </div>
  ),
}
