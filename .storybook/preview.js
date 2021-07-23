/** @jsxImportSource theme-ui */

import { ColorValues } from '@theme/tokens'
import { ThemeProvider } from 'theme-ui'
import { theme } from '@theme'
///import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons';
const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]


export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'dark',
        value: ColorValues.black[0],
      },
      {
        name: 'light',
        value: ColorValues.white[0],
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}