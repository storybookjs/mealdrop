import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/Typography/Heading',
  component: Heading,
  argTypes: {
    children: { controls: 'text' },
    level: { table: { disable: true } },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '',
  },
  render: ({ children }) => (
    <div>
      <Heading>{children || 'Heading 1'}</Heading>
      <Heading level={2}>{children || 'Heading 2'}</Heading>
      <Heading level={3}>{children || 'Heading 3'}</Heading>
      <Heading level={4}>{children || 'Heading 4'}</Heading>
    </div>
  ),
}
