import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1145-3229&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: ['Burger', 'Pizza', 'Sushi'],
    id: 'select',
    'aria-label': 'food',
  },
}

export const WithLabel: Story = {
  args: {
    ...Default.args,
    id: 'select',
    label: 'Select field',
  },
}
