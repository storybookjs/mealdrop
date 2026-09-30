import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconButton } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1131-437&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'arrow-right',
    small: false,
    'aria-label': 'forward',
  },
}

export const Small: Story = {
  args: {
    ...Default.args,
    small: true,
  },
}
