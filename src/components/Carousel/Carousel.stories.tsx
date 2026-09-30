import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import styled from 'styled-components'

import { Carousel } from '@droppy-ui/design-system'

const DemoSlide = styled.div`
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background-color: var(--ds-color-action-primary);
`

const makeSlides = (count: number) =>
  Array.from({ length: count }).map((_, index) => <DemoSlide key={index}>{index + 1}</DemoSlide>)

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  args: {
    itemsPerView: { mobile: 1, tablet: 2, desktop: 3 },
    children: makeSlides(8),
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Few enough items to fit at once: neither arrow is shown.
export const AllItemsVisible: Story = {
  args: {
    children: makeSlides(2),
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
  },
}
