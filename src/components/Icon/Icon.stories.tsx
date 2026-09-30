import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { css } from 'styled-components'

import { Body, Icon } from '@droppy-ui/design-system'

const icons = [
  'arrow-right',
  'arrow-left',
  'cross',
  'cart',
  'minus',
  'plus',
  'moon',
  'sun',
  'star',
] as const

const IconContainer = styled.div(
  () => css`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    div {
      border: 1px solid var(--ds-color-text-primary);
      border-radius: 8px;
      padding: 2rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        margin-top: 0.5rem;
      }
    }
  `
)

const meta = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      options: icons,
      control: {
        type: 'select',
      },
    },
    size: {
      control: {
        type: 'range',
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: StoryObj = {
  render: () => (
    <>
      <IconContainer>
        {icons.map((icon) => (
          <div key={icon}>
            <Icon name={icon} size={24} />
            <Body type="span" size="XS">
              {icon}
            </Body>
          </div>
        ))}
      </IconContainer>
    </>
  ),
}

export const Playground: Story = {
  args: {
    name: 'cart',
    size: 24,
  },
}
