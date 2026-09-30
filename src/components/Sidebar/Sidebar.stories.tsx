import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { fn } from 'storybook/test'

import { Body, Button, Sidebar } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    // This makes it so that the sidebar is loaded inside of an iframe in docs mode.
    // If it's not rendered in an iframe, the sidebar is going to open on top of Storybook itself!
    docs: { inlineStories: false, iframeHeight: 600 },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1714-3811&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
  },
  args: {
    isOpen: false,
    title: '',
    /*
    The following line emulates the event handler that would be passed to the component
    Read more about the `fn` utility function at
    https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
    */
    onClose: fn(),
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const openSidebar = () => setIsOpen(true)
    const closeSidebar = () => setIsOpen(false)
    useEffect(() => {
      setIsOpen(true)
    }, [])

    return (
      <>
        <Body>Press ESC to close the sidebar or click on the close icon!</Body>
        <Button onClick={openSidebar}>Open sidebar</Button>
        <Sidebar
          title="Your order"
          isOpen={isOpen}
          onClose={() => {
            closeSidebar()
          }}
          footer={<Body>Some footer here</Body>}
        >
          <Body>Some content here</Body>
        </Sidebar>
      </>
    )
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}
