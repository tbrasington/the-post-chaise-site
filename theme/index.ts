import {
  ColorTokens,
  ColorValues,
  FontSizes,
  FontWeights,
  Shadows,
  TextStyleNames,
  TextStyles,
  spaces,
  typeScale
} from "./tokens"

import { ButtonVariants } from "./buttons"
import { FormVariants } from "./forms"
import { TextStyleVariants } from "./textStyles"
import { Theme } from "@theme-ui/css"

export const theme: Theme = {
  initialColorModeName: "light",
  useColorSchemeMediaQuery: true,
  colors: {
    text: ColorValues.black[0],
    background: ColorValues.white[0],
    primary: ColorValues.blue[2],
    secondary: ColorValues.green[0],
    highlight: ColorValues.blue[2],
    accent: ColorValues.orange[0],
    muted: ColorValues.grey[2],
    gray: ColorValues.grey[1],
    darken: ColorValues.grey[0],
    modes: {
      dark: {}
    }
  },
  fontSizes: {
    [FontSizes.stepNegativeTwo]: typeScale(-2),
    [FontSizes.stepNegativeOne]: typeScale(-1),
    [FontSizes.stepZero]: typeScale(0),
    [FontSizes.stepOne]: typeScale(1),
    [FontSizes.stepTwo]: typeScale(2),
    [FontSizes.stepThree]: typeScale(3),
    [FontSizes.stepFour]: typeScale(4),
    [FontSizes.stepFour]: typeScale(5),
    [FontSizes.stepSix]: typeScale(6),
    [FontSizes.stepSeven]: typeScale(7),
    [FontSizes.stepEight]: typeScale(8),
    [FontSizes.stepNine]: typeScale(9)
  },
  fontWeights: {
    [FontWeights.bold]: 700,
    [FontWeights.regular]: 400
  },
  fonts: {
    paragraph: `"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace`,
    heading: `'Cousine', monospace`,
    label: `'Cousine', monospace`
  },
  lineHeights: {
    heading: 1.2,
    body: 1.6,
    label: 1.1
  },
  styles: {
    root: {
      fontFamily: TextStyles.paragraph,
      color: ColorTokens.text,
      bg: ColorTokens.background
    },
    h1: {
      fontFamily: TextStyles.heading,
      fontSize: FontSizes.stepNine,
      color: ColorTokens.primary
    },
    p: {
      m: 0,
      p: 0,
      variant: `text.${TextStyleNames.paragraph}`
    },
    a: {
      fontFamily: TextStyles.label,
      color: ColorTokens.primary,
      textDecoration: "none",
      ":hover": {
        color: ColorTokens.secondary,
        textDecoration: "underline"
      }
    }
  },
  space: spaces,
  buttons: ButtonVariants,
  forms: FormVariants,
  text: TextStyleVariants,
  shadows: {
    [Shadows.shadow01]: "0px 2px 8px rgba(203, 203, 203, 0.25)"
  },

  messages: {
    information: {
      position: "relative",
      py: 12,
      color: ColorTokens.secondary,
      ":before": {
        content: '"❍ "'
      }
    },
    error: {
      position: "relative",
      py: 12,
      color: ColorTokens.secondary,
      ":before": {
        content: '"⚠ "'
      }
    },
    success: {
      position: "relative",
      py: 12,
      color: ColorTokens.secondary,
      ":before": {
        content: '"✔︎ "'
      }
    }
  }
}

export default theme
