/** @jsxImportSource theme-ui */
import { Box, Flex } from "@theme-ui/components"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { ComponentMeta, ComponentStory } from "@storybook/react"

import React from "react"
import { TextStyleNames } from "../theme/tokens"

const TextStyleLayout: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        "> div + div": {
          mt: 32,
          maxWidth: "32ch"
        }
      }}
    >
      <Box sx={{ variant: `text.${TextStyleNames.page_title}` }}>
        Page title
      </Box>
      <Box sx={{ variant: `text.${TextStyleNames.sub_heading}` }}>
        Sub heading
      </Box>
      <Box sx={{ variant: `text.${TextStyleNames.statement}` }}>
        Try us out for free, when your ready move up to our everyday plan. If
        things are getting serious, go pro.
      </Box>

      <Box sx={{ variant: `text.${TextStyleNames.paragraph}` }}>
        <p>
          You can always switch the billing interval, or change your plan. And
          of course, cancel anytime
        </p>
      </Box>

      <Box sx={{ variant: `text.${TextStyleNames.paragraph_small}` }}>
        <p>
          You can always switch the billing interval, or change your plan. And
          of course, cancel anytime
        </p>
      </Box>

      <Box sx={{ variant: `text.${TextStyleNames.caption}` }}>
        This is a caption
      </Box>
      <Box sx={{ variant: `text.${TextStyleNames.label_standard}` }}>
        A label
      </Box>
      <Box sx={{ variant: `text.${TextStyleNames.label_upper}` }}>
        An uppercase label
      </Box>
      <Box sx={{ variant: `text.${TextStyleNames.action}` }}>Click me</Box>
    </Flex>
  )
}

export default {
  title: "Theme/TextStyles",
  component: TextStyleLayout
} as ComponentMeta<typeof TextStyleLayout>

const Template: ComponentStory<typeof TextStyleLayout> = args => (
  <TextStyleLayout {...args} />
)

export const TextStyledField = Template.bind({})
TextStyledField.args = {}
