import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { fn } from 'storybook/test'

import { Body, Button } from '@droppy-ui/design-system'

import { cartItems } from '../../stub/cart-items'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  title: 'Components/ShoppingCartMenu',
  component: ShoppingCartMenu,
  parameters: {
    // This makes it so that the modal is loaded inside of an iframe in docs mode.
    // If it's not rendered in an iframe, the modal is going to open on top of Storybook itself!
    docs: { inlineStories: false, iframeHeight: 600 },
  },
  args: {
    isOpen: true,
    cartItems: cartItems,
    totalPrice: 1200,
    /*
    The following lines emulate the event handlers that would be passed to the component
    Read more about the `fn` utility function at
    https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
    */
    onClose: fn(),
    onItemChange: fn(),
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    cartItems: [],
    totalPrice: 0,
  },
}

export const WithItems: Story = {}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}

export const Playground: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const openShoppingCartMenu = () => setIsOpen(true)
    const closeShoppingCartMenu = () => setIsOpen(false)

    useEffect(() => {
      setIsOpen(true)
    }, [])

    return (
      <>
        <Body>Press ESC to close the ShoppingCartMenu or click on the close icon!</Body>
        <Button onClick={openShoppingCartMenu}>Open ShoppingCartMenu</Button>
        <ShoppingCartMenu
          isOpen={isOpen}
          cartItems={cartItems}
          totalPrice={1200}
          onItemChange={() => {}}
          onClose={() => {
            closeShoppingCartMenu()
          }}
        />
      </>
    )
  },
}
