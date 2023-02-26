import { ComponentStory, ComponentMeta } from '@storybook/react'
import HeaderCart from './HeaderCart'

export default {
  title: 'Components/HeaderCart',
  component: HeaderCart
} as ComponentMeta<typeof HeaderCart>

const Template: ComponentStory<typeof HeaderCart> = () => <HeaderCart />

export const Primary = Template.bind({})

// Primary.args = {
