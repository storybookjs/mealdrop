import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'

import { Button } from '@droppy-ui/design-system'

import { FoodItemModal } from './FoodItemModal'

const meta = {
  title: 'Pages/RestaurantDetailPage/Components/FoodItemModal',
  component: FoodItemModal,
  parameters: {
    // This makes it so that the modal is loaded inside of an iframe in docs mode.
    // If it's not rendered in an iframe, the modal is going to open on top of Storybook itself!
    docs: { inlineStories: false, iframeHeight: 600 },
  },
  decorators: [
    (StoryEl) => (
      <>
        <div id="modal" />
        <StoryEl />
      </>
    ),
  ],
  args: {
    /*
    The following lines emulate the event handlers that would be passed to the component
    Read more about the `fn` utility function at
    https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
    */
    onClose: fn(),
    onItemSave: fn(),
    onItemRemove: fn(),
    cartItems: [],
  },
  render: () => {
    const itemMock = {
      name: 'Dish.name',
      description: 'Juicy dish with extra mayonaise',
      price: 12,
    }

    const [item, setItem] = useState<any>(itemMock)
    const openModal = () => setItem(itemMock)
    const closeModal = () => setItem(undefined)

    return (
      <>
        <p>Press ESC to close modal or click on the close icon!</p>
        <Button onClick={openModal}>Open modal</Button>
        <FoodItemModal
          item={item}
          cartItems={[item]}
          onClose={closeModal}
          onItemSave={() => {}}
          onItemRemove={() => {}}
        />
      </>
    )
  },
} satisfies Meta<typeof FoodItemModal>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  globals: {
    viewport: { value: 'responsive', isRotated: false },
  },
}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}
