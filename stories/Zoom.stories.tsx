/** @jsxImportSource theme-ui */
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { Zoom as Component } from "@components/common"
import React from "react"

export default {
  title: "Components/Content/Zoom",
  component: Component,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Zoom = Template.bind({})
Zoom.args = {}
