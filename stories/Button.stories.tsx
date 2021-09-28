import { ComponentMeta, ComponentStory } from "@storybook/react"

import { Button } from "@components/ui"
import React from "react"

export default {
  title: "Components/UI/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}>Click me</Button>
)

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary"
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: "secondary"
}

export const Link = Template.bind({})
Link.args = {
  variant: "link"
}
