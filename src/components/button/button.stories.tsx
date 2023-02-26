import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading'
    },
    children: {
      description: 'Nội dung button',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    },
    className: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Đăng nhập',
  className: 'mt-6 flex h-[48px] w-full items-center justify-center rounded bg-primary p-3 text-white ',
  isLoading: true
}

export const Secondary = Template.bind({})

Secondary.args = {
  children: 'Đăng ký',
  className: 'mt-6 flex h-[48px] w-full items-center justify-center rounded bg-primary p-3 text-white ',
  isLoading: true,
  disabled: true
}
