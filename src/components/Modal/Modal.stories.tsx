import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { fn } from 'storybook/test'

import { Body, Button, Modal } from '@droppy-ui/design-system'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // This makes it so that the modal is loaded inside of an iframe in docs mode.
    // If it's not rendered in an iframe, the modal is going to open on top of Storybook itself!
    docs: { inlineStories: false, iframeHeight: 600 },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?type=design&node-id=1138-3227&mode=design&t=zmyrZnTzOLfLqBwr-4',
    },
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
    isOpen: false,
    /*
    The following line emulates the event handler that would be passed to the component
    Read more about the `fn` utility function at
    https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
    */
    onClose: fn(),
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    useEffect(() => {
      setIsOpen(true)
    }, [])

    return (
      <>
        <Body>Press ESC to close modal or click on the close icon!</Body>
        <Button onClick={openModal}>Open modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            closeModal()
          }}
        >
          <Body style={{ padding: '1.5rem' }}>Some content here</Body>
        </Modal>
      </>
    )
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}
